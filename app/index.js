
'use strict';

const httpHandler = require('./httpHandler');

const done = function(err, res, callback) {
  var bodyStr;
  if (err) {
    bodyStr = JSON.stringify({
      result: "error",
      errorDetail: err
    });
  } else {
    bodyStr = JSON.stringify({
      result: "success",
      response: res
    });
  }

  callback(null, {
    statusCode: err ? '400' : '200',
    body: bodyStr,
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

exports.userMedalsList = (event, context, callback) => {
    const userMedalsList = require('./userMedalsList');

    if (!event.queryStringParameters.token) {
        return done('Token parameter missing.', null, callback);
    }

    console.log("Token: " + event.queryStringParameters.token);

    userMedalsList(httpHandler, event.queryStringParameters.token, function(err, res) {
        done(err, res, callback);
    });
};
