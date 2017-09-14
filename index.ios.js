/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';
import { Button, Container, Content, Text, Title, Body, Header, Footer } from 'native-base';
import { NativeModules } from 'react-native';
import iapReceiptValidator from 'iap-receipt-validator';
const password = '103a060028924160b2890249b7706a8c'; // Shared Secret from iTunes connect
const production = false; // use sandbox or production url for validation
const validateReceipt = iapReceiptValidator(password, production);

const validate = async (receiptData) => {
    try {
        const validationData = await validateReceipt(receiptData);

        // check if Auto-Renewable Subscription is still valid
        console.log('validationData: ', validationData)
        // validationData['latest_receipt_info'][0].expires_date > today
    } catch(err) {
        console.log(err.valid, err.error, err.message)
    }
}


const { InAppUtils } = NativeModules;

let products = [
  'com.subTest.annualSub',
  'com.subTest.monthly',
];


export default class subscriptionTest extends Component {

  handleMonthlySub() {
    var productIdentifier = 'com.subTest.monthly';
    InAppUtils.loadProducts(products, (error, products) => {
    // console.log('products: ', products);
      if (error) {
        console.log('error: ', error);
      }
      console.log('products: ', products);
      InAppUtils.purchaseProduct(productIdentifier, (error, response) => {
         // NOTE for v3.0: User can cancel the payment which will be available as error object here.
         if(response && response.productIdentifier) {
            alert('Purchase Successful. Your Transaction ID is ' + response.transactionIdentifier);
            //unlock store here.
          console.log('response: ', response);
         } else {
          console.log('error: ', error);
         }
      });
    })
  }

  handleReceipt() {
    InAppUtils.receiptData((error, receiptData)=> {
      if(error) {
        Alert.alert('itunes Error', 'Receipt not found.');
      } else {
        console.log('receipt handled')
        //send to validation server
         // console.log('receiptData: ', receiptData);
        validate(receiptData);
      }
    });
  }

  restorePurchases() {
    console.log('restore button pressed');
    InAppUtils.restorePurchases((error, response) => {
      console.log('response: ', response);
      if(error) {
        alert('itunes Error', 'Could not connect to itunes store.');
        console.log('error: ', error);
      } else {
        alert('Restore Successful', 'Successfully restores all your purchases.');

        if (response.length === 0) {
          console.log('no purchases')
          alert('No Purchases', "We didn't find any purchases to restore.");
          return;
        }

        response.forEach((purchase) => {
          console.log('purchase: ', purchase);
          if (purchase.productIdentifier === 'com.subTest.annualSub') {
            // Handle purchased product.

            console.log('monthly subscription restored');
          }
        });
      }
      });
  }

  handlePicture() {

  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>
              Subscription Tests
            </Title>
          </Body>
        </Header>
        <Content padder>
        <Body>
          <Button info outline onPress={this.handleMonthlySub}>
            <Text>
              Subscribe monthly
            </Text>
          </Button>
          <Button info onPress={() => console.log('subscribed annually')}>
            <Text>
              Subscribe annually
            </Text>
          </Button>
          <Button info onPress={() => {console.log('cancelled'); console.log(InAppUtils);}}>
            <Text>
              Cancel
            </Text>
          </Button>
          <Button info outline onPress={this.restorePurchases}>
            <Text>
              Restore Purchases
            </Text>
          </Button>
          <Button info outline onPress={this.handleReceipt}>
            <Text>
              Create receipt
            </Text>
          </Button>
          <Button info outline onPress={this.handlePicture}>
            <Text>
              Take Photo
            </Text>
          </Button>
        </Body>
        </Content>
        <Footer style={{backgroundColor: 'turquoise'}} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('subscriptionTest', () => subscriptionTest);
