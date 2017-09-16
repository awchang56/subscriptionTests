import Config from './config/config.js'
import sha1 from 'sha1';


module.exports = (imagePath) => {
  let cloud_name = Config.cloudinary.cloud_name;
  let api_secret = Config.cloudinary.api_secret;
  let url = 'https://api.cloudinary.com/v1_1/' + cloud_name + '/image/upload';

  let timestamp = Date.now();
  let tags = ['pic'];
  return {
    body: {
      file: 'data:image/png;base64,' + imagePath,
      api_key: Config.cloudinary.api_key,
      timestamp: timestamp,
      tags: tags,
      signature: sha1("tags=" + tags + "&timestamp=" + timestamp + api_secret)
    },
    url: url
  };
}