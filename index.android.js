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
const { InAppUtils } = NativeModules;


export default class subscriptionTest extends Component {

  handleMonthlySub() {
    let products = [
      'com.subTest.annualSub',
      'monthly123',
    ];
    InAppUtils.loadProducts(products, (error, products) => {
    console.log('products: ', products);
      if (error) {
        console.log('error: ', error);
      }
      console.log('products: ', products);
    })
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
          <Button info onPress={() => console.log('cancelled')}>
            <Text>
              Cancelled
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
