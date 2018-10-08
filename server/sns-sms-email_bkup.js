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
var brownTopic = 'xxxxx';

module.exports = {

  createOrGetTopic: function(topicName) {
    return new Promise( (resolve, reject) => {
      var params = {
        Name: topicName,
      }
      sns.createTopic(params, (err, data) => {
        if (err) reject(err);
        else resolve(data.TopicArn);
      })
    })

  },

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
      if (err) console.log(err, err.stack);
      else     console.log(data);
    });
  },

  checkSubscription: function(topic) {
    var params = {
      TopicArn: topic, /* required */
    };

    sns.listSubscriptionsByTopic(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else     console.log(data);

    });
  }

}



// module.exports.publish(brownTopic, '');
// module.exports.checkSubscription(brownTopic);
// module.exports.subscribeSMS(brownTopic, '+1xxxxxxx');
// module.exports.subscribeEmail(brownTopic, 'xxxxx@xxxxx.com');
// module.exports.checkSubscription(brownTopic);
// module.exports.publish(brownTopic, 'before unsubs');
// module.exports.unsubscribe(brownTopic, '+1xxxxxxx');
// module.exports.checkSubscription(brownTopic);
// module.exports.publish(brownTopic, 'after unsubs');


