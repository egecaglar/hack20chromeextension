const axios = require('axios');

function getProductInfo(api_key, url_input) {
    const params = {
        api_key: api_key,
        type: "product",
        url: url_input
    };
    return axios.get('https://api.rainforestapi.com/request', { params })
      .then(response => {
        product = response.data.product;
        var allWords = [];
        allWords.push(product.title);
        for(item of product.categories) {
          allWords.push(item.name);
        }
        return allWords;
      })
      .catch(function (error) {
        console.log(error);
        return Promise.reject(error);
      });
};

getProductInfo(api_key="E2EA029907304CE692BA8CCA70B8BCF4", url_input="https://www.amazon.com/Sony-Alpha-a6400-Mirrorless-Camera/dp/B07MV3P7M8/ref=sr_1_2?dchild=1&qid=1597524826&s=electronics&sr=1-2").then(allWords => {
  // Do anything you want here - probably search the DB for each word!
  console.log(allWords)
  /*
  Try not to run this too many times, i have only 90 trials left. If you need more, you can open up an account and replace the api_key with yours.
  This code returned the following output:
  [
    'Sony Alpha a6400 Mirrorless Camera: Compact AP
  S-C Interchangeable Lens Digital Camera with Real
  -Time Eye Auto Focus, 4K Video, Flip Screen & 16-
  50mm Lens - E Mount Compatible Cameras - ILCE-640
  0L/B',
    'Electronics',
    'Electronics',
    'Camera & Photo',
    'Digital Cameras',
    'Mirrorless Cameras'
  ]

  You might want to discard the title (first entry in the array) when searching the DB.
  */
});

// To learn more about promises:
// https://web.dev/promises/
