const apiBaseUrl = 'https://od-api.oxforddictionaries.com/api/v1';
const apiId = '6f53d19b';
const apiKey =  '2c943c507d759d34f9a5ea42fe9429b6';
const requestUrl = 'https://od-api.oxforddictionaries.com/api/v1/entries/en/'; // + word
const requestHeaders = {
  Accept: 'application/json',
  app_id: apiId,
  app_key: apiKey
};



module.exports.apiId = apiId;
module.exports.apiKey = apiKey;
module.exports.requestUrl = requestUrl;
module.exports.requestHeaders = requestHeaders;