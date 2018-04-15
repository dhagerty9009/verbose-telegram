const runtimeConfig = require("cloud-functions-runtime-config");
const Twitter = require("twitter");
const language = require("@google-cloud/language");
const languageClient = new language.LanguageServiceClient();
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
      twitterAccessSecretValue = twitterAccessSecretValue || val;
    })
    .catch(err => {
      console.log(err);
      response.status(500).send(err);
    });
}

function getText(tweets) {
  var validURL = require("valid-url");
  var texts = [];
  for (var i = 0; i < tweets.length; i++) {
    var text = tweets[i].full_text;
    if (!validURL.isUri(text)) {
      texts[i] = text;
    }
  }
  return texts;
}

function getAnalysis(tweet) {
  var output = [];
  if (tweet != null) {
    const document = {
      content: tweet,
      type: "PLAIN_TEXT"
    };
    languageClient
      .analyzeSentiment({ document: document })
      .then(results => {
        const sentiment = results[0].documentSentiment;
        output[0] = sentiment.score;
        output[1] = tweet;
        console.log("Intermediate result: ", output);
        return output;
      })
      .catch(err => {
        console.error("ERROR:", err);
      });
  }
}

exports.getTweets = (request, response) => {
  setApiKey(response);
  setApiSecret(response);
  setAccessKey(response);
  setAccessSecret(response);
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
      var tweetTexts = getText(tweets);
      analysisData = tweetTexts.map(getAnalysis);
      console.log("Final result: ", analysisData);
      response.status(200).send(analysisData);
    })
    .catch(error => {
      console.log(error);
      response.status(500).send(error);
    });
};
