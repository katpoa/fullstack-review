const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (handle, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    // url: `https://api.github.com/users/${handle}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  axios.get(`https://api.github.com/users/${handle}/repos`, options)
  // .then(data => (console.log("getReposbyusername: ", data)))
  .then(results => (callback(null, results.data)))
  .catch(err => {
    console.log('error in github api GET')
    callback(err)
  })
}

module.exports = getReposByUsername;