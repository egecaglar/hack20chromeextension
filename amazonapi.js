const AWS = require('aws-sdk');
const table = "BlackOwnedBusinesses";
const axios = require('axios');
const api_key = "E2EA029907304CE692BA8CCA70B8BCF4";

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: "us-west-2"
});

async function getProductInfo(api_key, url_input) {
    const params = {
        api_key: api_key,
        type: "product",
        url: url_input
    };
    let response = await axios.get('https://api.rainforestapi.com/request', { params })
    .catch(function (error) {
        console.log(error);
        return Promise.reject(error);
    });
    let product = response.data.product;
    var words = [];
    words.push(product.title);
    for(let item of product.categories) {
      words.push(item.name);
    }
    return words;
};

exports.handler = async (event) => {
    const url = event.queryStringParameters.url;
    var results = [];
    var allWords = await getProductInfo(api_key, url);
    
    let i;
    for(i = 1 ; i < allWords.length ; i++){
        var params = {
        TableName : table,
            Key: {
                "category" : allWords[i]
            }
        };
        
        const data = await dynamoDb.get(params).promise();
           if(!(Object.entries(data).length === 0)){
                results.push(JSON.stringify(data));
            } 
    }
    
    const response = {
        isBase64Encoded: false,
        headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin" : "*"}
    };
    
    if(results.length > 0){
        response.statusCode = 200;
        response.body = JSON.stringify(Array.from(new Set(results)));
    }
    else{
        response.statusCode = 500;
    }
    return response;
    
};
