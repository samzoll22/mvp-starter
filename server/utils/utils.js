const request = require('request');
const api = require('../config/config.js');
const Promise = require('bluebird');


const getDefinition = (word, callback) => {
  console.log('Inside utility function', word, typeof word);
  const options = {
    url: api.requestUrl + word,
    headers: {
      Accept: 'application/json',
      app_id: api.apiId,
      app_key: api.apiKey
    }
  }

  request(options, (error, response, fields) => {
    if (error) {
      console.error('Error: ', error);
      callback(error, null);
    } else {
      // console.log('Definitions from api response', JSON.parse(response.body).results[0].lexicalEntries[0].entries, JSON.parse(response.body));
      let responseBody = JSON.parse(response.body);
      // let word = responseBody.results[0].word;
      // let definition = responseBody.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
      // let entries = {
      //   word: word,
      //   definitions: {definition: JSON.parse(response.body).results[0].lexicalEntries,
      //     example
      // };
      let lexicalCategories = organiseDefinitionEntries(responseBody);
      // console.log('lexicalCategories', lexicalCategories);
      // let entries = responseBody.results[0].lexicalEntries;
      tempWords.push(lexicalCategories);
      callback(null, tempWords);
    }
  });

  // let requestAsync = Promise.promisify(request);
  // requestAsync(options, (error, response, fields) => {
  //   console.log('Inside request Async', JSON.parse(response.body).results[0], typeof JSON.parse(response.body).results)[0];
  //   // if (error) {
  //   //   throw error;
  //   // }
  //   // else {
  //     return JSON.parse(response.body)[0];
  //   // }
  // })
  // .then(definition => {
  //   console.log('Here is the definition: ', definition);
  //   return definition;
  // })
  // .catch(error => {
  //   console.error('Error in requestAsync');
  //   return error;
  // });
};

const organiseDefinitionEntries = function(searchResult) {
  // Map through the searchResult {} for lexical categories.
  let word = {
    id: searchResult.results[0].id,
    lexicalCategories: []
  };

  searchResult.results[0].lexicalEntries.forEach(lexicalEntry => {
    let category = {
      type: lexicalEntry.lexicalCategory,
      entry: []
    };

    lexicalEntry.entries[0].senses.forEach(sense => {
      // Map through lexicalCategories for entries and definitions.
      let definitionAndExample = {
        definition: '',
        example: ''
      };
      console.log('sense', sense);
      if (!sense.definitions) {
        return;
      } else {
        definitionAndExample.definition = sense.definitions[0];
      }

      if (sense.subsenses !== undefined) {
        if (definitionAndExample.example = sense.subsenses[0].examples !== undefined) {
          definitionAndExample.example = sense.subsenses[0].examples[0].text;
        }
      } else if (sense.examples !== undefined) {
        definitionAndExample.example = sense.examples[0];
      } else {
        definitionAndExample.example = '';
      }


      category.entry.push(definitionAndExample);
    });

    word.lexicalCategories.push(category);
  });
  
  // If the 'Residual' category was pushed to lexicalCategories, remove it.
  for (let i = 0; i < word.lexicalCategories.length;i++) {
    if (word.lexicalCategories[i].type === 'Residual') {
      word.lexicalCategories.splice(i, 1);
      break;
    }
  }
  return word;
};


// The tempWords [] is to mimic the db before we have built out the db.
const tempWords = [
// {
//   word: 'computer',
//   definition: 'a programmable electronic device designed to accept data, perform prescribed mathematical and logical operations at high speed, and display the results of these operations. Mainframes, desktop and laptop computers, tablets, and smartphones are some of the different types of computers.'
// },
// {
//   word: 'house',
//   definition: 'a building in which people live; residence for human beings.'
// }
];

module.exports.getDefinition = getDefinition;
module.exports.tempWords = tempWords;