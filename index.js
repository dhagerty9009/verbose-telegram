const runtimeConfig = require("cloud-functions-runtime-config");
// const Twitter = require("twitter");
// const language = require("@google-cloud/language");
const twitterApiKey = runtimeConfig.getVariable(
  "external-apis",
  "twitter_consumer_key"
);
const twitterApiSecret = runtimeConfig.getVariable(
  "external-apis",
  "twitter_consumer_secret"
);
const twitterAccessKey = runtimeConfig.getVariable(
  "external-apis",
  "twitter_access_key"
);
const twitterAccessSecret = runtimeConfig.getVariable(
  "external-apis",
  "twitter_access_key"
);
// let twitterApiKeyValue;
// let twitterApiSecretValue;
// let twitterAccessKeyValue;
// let twitterAccessSecretValue;

exports.getTweets = (request, response) => {
  return twitterApiKey
    .then(val => {
      console.log(val);
      res.status(200).send(val);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  // var client = new Twitter({
  //   consumer_key: twitterApiKey,
  //   consumer_secret: twitterApiSecret,
  //   access_token_key: twitterAccessKey,
  //   access_token_secret: twitterAccessSecret
  // });
  // client.get("statuses/user_timeline", {
  //   screen_name: "realDonaldTrump",
  //   count: 10
  // });
};
