const request = require('request');
const api = require('../config/config.js');
const Promise = require('bluebird');
const db = require('../../database-mysql/index');

// API search.
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
      let responseBody = JSON.parse(response.body);
      let lexicalCategories = organiseDefinitionEntries(responseBody);
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

// Organise response data from Oxford Dictionary API into managable object for client and database.
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
      // console.log('sense', sense);
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
  console.log('Organised definition response: ', word);
  db.inputToDatabase(word);
  return word;
};

/* example of output from organiseDefinitionEntries

const word = {id: 'bag',
              lexicalCategories: [{type: 'noun',
                                   entry: [{definition: 'a flexible container with an opening at the top, used for carrying things',
                                            example: 'a bag of sugar'},
                                           {definition: 'a woman, especially an older one, perceived as unpleasant or unattractive',
                                            example: 'an interfering old bag'},
                                           {definition: 'one\'s particular interest or taste',
                                            example: 'ask the manager about mild curries, if that's your bag'},
                                           {definition: 'a base',
                                            example: ''},
                                            definition: '(in southern Africa) a unit of measurement, used especially of grain, equal to 70 kg (formerly 200 lb)',
                                            example: ''}
                                          ]
                                  },
                                  {type: 'verb',
                                   entry: [{definition: 'put (something) in a bag',
                                            example: 'customers bagged their own groceries'},
                                           {definition: 'succeed in killing or catching (an animal)',
                                            example: 'get there early to bag a seat in the front row'},
                                           {definition: '(of clothes, especially trousers) form loose bulges due to wear',
                                            example: 'these trousers never bag at the knee'},
                                           {definition: 'abandon or give up on',
                                            example: 'she ought to just bag this marriage and get on with her life'},
                                           {definition: 'criticize',
                                            example: 'it\'s a pretty suspect outfit, deserving of the consistent bagging it gets from customers'},
                                           {definition: 'fit (a patient) with an oxygen mask or other respiratory aid',
                                            example: ''},
                                          ]
                                  }
                                 ]
              }

*/


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