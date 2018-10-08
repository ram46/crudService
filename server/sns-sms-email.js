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
var TOPIC_ARN = '';

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

    return new Promise( (resolve, reject) => {
      var params = {
        Protocol: 'sms',
        TopicArn: topic,
        Endpoint: phoneNumber,
        ReturnSubscriptionArn: true || false
      };

      sns.subscribe(params, function(err, data) {
        if (err) reject(err, err.stack);
        else     resolve(data);
      })
    })
  },


  subscribeEmail: function(topic, email) {
    return new Promise( (resolve, reject) => {
      var params = {
        Protocol: 'Email',
        TopicArn: topic,
        Endpoint: email,
        ReturnSubscriptionArn: true || false
      };

      sns.subscribe(params, function(err, data) {
        if (err) reject(err, err.stack);
        else     resolve(data);
      });
    })
  },


  getSubscriptionsByTopic: function(topic) {
    return new Promise( (resolve, reject) => {
       var params = {
        TopicArn: topic,
      };
      sns.listSubscriptionsByTopic(params, function(err, data) {
        if (err) reject(err, err.stack);
        else     resolve(data);
      })
    })
  },

  unsubscribe: function(topic, endpoint) {

    return new Promise( (resolve, reject) => {
      var params = {
        TopicArn: topic,
      };

      module.exports.getSubscriptionsByTopic(topic)
      .then( (data) => {
        data.Subscriptions.forEach( (topicObj) => {
          if (topicObj.TopicArn === topic && topicObj.Endpoint === endpoint) {

            var params = {
              SubscriptionArn: topicObj.SubscriptionArn
            };

            sns.unsubscribe(params, function(err, data) {
              if (err) reject(err, err.stack);
              else     resolve(data);
            });
          }
        })
      })
      .catch((err) => {
        console.log(err);
      })
    })
  },

  publish: function(topic, smsMsg, emailMsg) {
    return new Promise( (resolve, reject) => {
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
        if (err) reject(err, err.stack);
        else     resolve(data);
      });
    })

  },

}


// module.exports.createOrGetTopic('brrrr')
// .then( (topicARN) => {
//   TOPIC_ARN = topicARN;
//   return topicARN
// })

// module.exports.createOrGetTopic('brrrr')
// .then( (topicARN) => {
//   TOPIC_ARN = topicARN;
//   return topicARN
// })
// .then( () => {
//   module.exports.getSubscriptionsByTopic(TOPIC_ARN)
//   .then( (result) => {
//     console.log('in getSubscriptionsByTopic *', result)
//   })
//   .then( () => {
//     module.exports.subscribeSMS(TOPIC_ARN, '+1xxxxxxxxxxx')
//     .then((result) => {
//       console.log('in subscribeSMS ', result);
//     })
//     .then( () => {
//       module.exports.publish(TOPIC_ARN, 'hehe', 'haha')
//       .then ( (result) => {
//         console.log('in publish ', result);
//       })
//       .then( () => {
//         module.exports.getSubscriptionsByTopic(TOPIC_ARN)
//         .then( (result) => {
//           console.log('in getSubscriptionsByTopic ** ', result)
//         })
//         .then( () => {
//           module.exports.subscribeEmail(TOPIC_ARN, 'xxxxx@xxxx.com')
//           .then((result) => {
//             console.log('in subscribeEmail ', result)
//           })
//           .then( () => {
//             module.exports.getSubscriptionsByTopic(TOPIC_ARN)
//             .then( (result) => {
//               console.log('in getSubscriptionsByTopic ***', result)
//             })
//             .then( () => {
//               module.exports.publish(TOPIC_ARN, 'moon', 'sun')
//               .then ( (result) => {
//                 console.log('in publish ', result);
//               })
//               .then( () => {
//                 module.exports.unsubscribe(TOPIC_ARN, '+1xxxxxxxxxxx')
//                 .then( (result) => {
//                   console.log('in unsubscribe ', result)
//                 })
//                 .then( () => {
//                   module.exports.unsubscribe(TOPIC_ARN, 'xxxxx@xxxx.com')
//                   .then( (result) => {
//                     console.log('in unsubscribe ', result)
//                   })
//                   .then( () => {
//                     module.exports.getSubscriptionsByTopic(TOPIC_ARN)
//                       .then( (result) => {
//                         console.log('in getSubscriptionsByTopic after unsubscribe ****', result)
//                       })
//                     })
//                   })
//                 })
//               })
//             })
//           })
//         })
//       })
//     })
//   })







