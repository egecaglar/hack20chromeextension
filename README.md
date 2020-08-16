HI HI HI
Dear frontend team:
Here's the API link to the backend response:
https://jw2wgnn6xh.execute-api.us-west-2.amazonaws.com/test/businesses?url=https://www.amazon.com/Sony-Alpha-a6400-Mirrorless-Camera/dp/B07MV3P7M8/ref=sr_1_2?dchild=1&qid=1597524826&s=electronics&sr=1-2

replace our amazon url with your variable representing the url the user is on. You will get a response that looks like this:
["{\"Item\":{\"category\":\"Electronics\",\"url\":\"https://webuyblack.com/\",\"businessName\":\"We Buy Black\"}}","{\"Item\":{\"category\":\"Electronics\",\"url\":\"https://webuyblack.com/\",\"businessName\":\"We Buy Black\"}}","{}","{}","{}"]
(except hopefully without duplicates/null values we're working on it :) )
