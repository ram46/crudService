// References
  // 1- https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SNS.html#listSubscriptionsByTopic-property
  // 2- https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sns-examples-subscribing-unubscribing-topics.html
  // 3- https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sns-examples-sending-sms.html


// Steps
  // 1- Create a topic (done via console/UI in AWS SNS)
  // 2- Subscribe to that topic
  // 3- Publish topic

// Optional steps in between
  // unsubscribe
  // check or list subscriptions


var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

var sns = new AWS.SNS();
var brownTopic = 'arn:aws:sns:us-east-1:977163535489:brown-sms';

module.exports = {

  subscribeSMS: function(topic, phoneNumber) {
    var params = {
      Protocol: 'sms',
      TopicArn: topic,
      Endpoint: phoneNumber,
      ReturnSubscriptionArn: true || false
    };

    sns.subscribe(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else     console.log(data);
    });
  },


  subscribeEmail: function(topic, email) {
    var params = {
      Protocol: 'Email',
      TopicArn: topic,
      Endpoint: email,
      ReturnSubscriptionArn: true || false
    };

    sns.subscribe(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else     console.log(data);
    });
  },

  unsubscribe: function(topic, endpoint) {
    var params = {
      TopicArn: topic,
    };

    sns.listSubscriptionsByTopic(params, function(err, data) {
      if (err) console.log(err, err.stack);

      else {

        data.Subscriptions.forEach( (topicObj) => {
          if (topicObj.TopicArn === topic && topicObj.Endpoint === endpoint) {

            var params = {
              SubscriptionArn: topicObj.SubscriptionArn
            };

            sns.unsubscribe(params, function(err, data) {
              if (err) console.log(err, err.stack);
              else     console.log(data);
            });
          }
        })
      }
    });
  },

  publish: function(topic, smsMsg, emailMsg) {
    var params = {
      Message: JSON.stringify({
        "default": "to all email & sms subscribers",
        "email": emailMsg,
        "sms": smsMsg
      }),
      Subject: 'brown',
      TopicArn: topic,
      MessageStructure: 'json'
    };
    sns.publish(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
  },

  checkSubscription: function(topic) {
    var params = {
      TopicArn: topic, /* required */
    };

    sns.listSubscriptionsByTopic(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response

    });
  }

}



// module.exports.publish(brownTopic, '');

// console.log('........checking subscriptions..........')
// module.exports.checkSubscription(brownTopic);

// console.log('..............subscribing SMS...............')
// module.exports.subscribeSMS(brownTopic, '+14087699443');

// module.exports.subscribeEmail(brownTopic, 'khizra6@gmail.com');

// console.log('........checking subscriptions again..........')
// module.exports.checkSubscription(brownTopic);


// console.log('..............publishing and should get a msg...............')
// module.exports.publish(brownTopic, 'before unsubs');

// console.log('..............Un-subscribing...............')
// module.exports.unsubscribe(brownTopic, '+14087699443');


// console.log('........checking subscriptions one more time..........')
// module.exports.checkSubscription(brownTopic);


// console.log('........publishing but should NOT get msg..........')
// module.exports.publish(brownTopic, 'after unsubs');








