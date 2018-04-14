const runtimeConfig = require("cloud-functions-runtime-config");
const Twitter = require("twitter");
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
  "twitter_access_secret"
);
let twitterApiKeyValue,
  twitterApiSecretValue,
  twitterAccessKeyValue,
  twitterAccessSecretValue;

function setApiKey(response) {
  return twitterApiKey
    .then(val => {
      console.log(val);
      twitterApiKeyValue = twitterApiKeyValue || val;
    })
    .catch(err => {
      console.error(err);
      response.status(500).send(err);
    });
}

function setApiSecret(response) {
  return twitterApiSecret
    .then(val => {
      console.log(val);
      twitterApiSecretValue = twitterApiSecretValue || val;
    })
    .catch(err => {
      console.error(err);
      response.status(500).send(err);
    });
}

function setAccessKey(response) {
  return twitterAccessKey
    .then(val => {
      console.log(val);
      twitterAccessKeyValue = twitterAccessKeyValue || val;
    })
    .catch(err => {
      console.log(err);
      response.status(500).send(err);
    });
}

function setAccessSecret(response) {
  return twitterAccessSecret
    .then(val => {
      console.log(val);
      twitterAccessSecretValue = twitterAccessSecretValue || val;
    })
    .catch(err => {
      console.log(err);
      response.status(500).send(err);
    });
}

function parseTweets(tweets) {
  var parsed = [];
  for (var i = 0; i < tweets.length; i++) {
    parsed[i] = JSON.parse(tweets[i]);
  }
  return parsed;
}

function getText(tweets) {
  var texts = [];
  for (var i = 0; i < tweets.length; i++) {
    var text = tweets[i].full_text;
    if () {}
    texts[i] = text;
  }
  return texts;
}

exports.getTweets = (request, response) => {
  setApiKey(response);
  setApiSecret(response);
  setAccessKey(response);
  setAccessSecret(response);
  var tweetIDs;
  var client = new Twitter({
    consumer_key: twitterApiKeyValue,
    consumer_secret: twitterApiSecretValue,
    access_token_key: twitterAccessKeyValue,
    access_token_secret: twitterAccessSecretValue
  });
  client
    .get("statuses/user_timeline", {
      screen_name: "realDonaldTrump",
      count: 20,
      tweet_mode: "extended"
    })
    .then(tweets => {
      var parsedTweets = parseTweets(tweets);
      console.log(parsedTweets);
      response.status(200).send(tweets);
    })
    .catch(error => {
      console.log(error);
      response.status(500).send(error);
    });
};
