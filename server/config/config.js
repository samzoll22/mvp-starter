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



const fakeResponse = {
    "metadata": {
        "provider": "Oxford University Press"
    },
    "results": [
        {
            "id": "custard",
            "language": "en",
            "lexicalEntries": [
                {
                    "entries": [
                        {
                            "etymologies": [
                                "late Middle English crustarde, custarde (denoting an open pie containing meat or fruit in a spiced or sweetened sauce thickened with eggs), from Old French crouste (see crust)"
                            ],
                            "grammaticalFeatures": [
                                {
                                    "text": "Mass",
                                    "type": "Countability"
                                },
                                {
                                    "text": "Singular",
                                    "type": "Number"
                                }
                            ],
                            "homographNumber": "000",
                            "senses": [
                                {
                                    "definitions": [
                                        "a dessert or sweet sauce made with milk and eggs, or milk and a proprietary powder."
                                    ],
                                    "domains": [
                                        "Sweet"
                                    ],
                                    "id": "m_en_gbus0243500.005"
                                }
                            ]
                        }
                    ],
                    "language": "en",
                    "lexicalCategory": "Noun",
                    "pronunciations": [
                        {
                            "audioFile": "http://audio.oxforddictionaries.com/en/mp3/custard_gb_1.mp3",
                            "dialects": [
                                "British English"
                            ],
                            "phoneticNotation": "IPA",
                            "phoneticSpelling": "ˈkʌstəd"
                        }
                    ],
                    "text": "custard"
                }
            ],
            "type": "headword",
            "word": "custard"
        }
    ]
}


module.exports.fakeResponse = fakeResponse;