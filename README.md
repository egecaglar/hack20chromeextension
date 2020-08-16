HI HI HI
Dear frontend team:
Here's the API link to the backend response:
https://jw2wgnn6xh.execute-api.us-west-2.amazonaws.com/test/businesses?url=https://www.amazon.com/Sony-Alpha-a6400-Mirrorless-Camera/dp/B07MV3P7M8/ref=sr_1_2?dchild=1&qid=1597524826&s=electronics&sr=1-2

replace our amazon url with your variable representing the url the user is on. You will get a response that looks like this:
  "body": "[{\"Item\":{\"category\":\"Beauty & Personal Care\",\"businessName\":\"Dreamstar Cosmetics\",\"imageUrl\":\"https://cdn.shopify.com/s/files/1/0336/8625/7797/files/DreamstarLogoPNGBRIGHT_300x300.png?v=1591584679\",\"description\":\"An artisan bath and body beauty brand that combines a love of music and hip-hop/pop culture with a love of all things fun and colorful!\",\"url\":\"https://www.dreamstarcosmetics.com/\"}},{\"Item\":{\"category\":\"Beauty & Personal Care\",\"businessName\":\"Dreamstar Cosmetics\",\"imageUrl\":\"https://cdn.shopify.com/s/files/1/0336/8625/7797/files/DreamstarLogoPNGBRIGHT_300x300.png?v=1591584679\",\"description\":\"An artisan bath and body beauty brand that combines a love of music and hip-hop/pop culture with a love of all things fun and colorful!\",\"url\":\"https://www.dreamstarcosmetics.com/\"}}]"

