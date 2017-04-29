var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'my_words'
});

const selectAll = (callback) => {
  connection.query('SELECT * FROM items', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};


const inputToDatabase = (word) => {
  // console.log('word input', word.lexicalCategories[0].entry[3].example);
  // Configuration template {} for a single entry to words table in db.
  let inputs = {
    word: '',
    category: '',
    definition: '',
    example: ''
  };

  // Set input word column input.
  inputs.word = word.id;
  // For each lexicalCategory, iterate through ...
  word.lexicalCategories.forEach(lexicalCategory => {
    // For each entry in a lexicalCategory, configure the template and insert into words table in db.
    inputs.category = lexicalCategory.type;
    lexicalCategory.entry.forEach(packet => {
      inputs.definition = packet.definition;
      if (typeof packet.example === 'object') {
        inputs.example = packet.example.text;
      } else {
        inputs.example = packet.example;
      }
      console.log('inputs', inputs);
      // Create a query string for mysql table insert.
      let queryString = 'INSERT INTO words SET ?';

      // Write function invokation to combine queryString, inputs and callback for response.
      connection.query(queryString, inputs, (error, results, fields) => {
        if (error) {
          console.error('Error inserting words to db.', error);
        } else {
          console.log('Success inserting words to db.');
        }
      });
    });
  });

}

module.exports.selectAll = selectAll;
module.exports.inputToDatabase = inputToDatabase;