/**
 * Lib
 */
var AWS = require("aws-sdk");
var doc = require('dynamodb-doc');
AWS.config.update({region: "ap-northeast-1"});
var dynamo = new doc.DynamoDB();

module.exports.respond = function(event, cb) {
  var dynamoRequest = {
        TableName: 'elasticommerce-search-service-dev-ProductSerarchTotalvalue',
        Item: {
          'SearchWord':event.word,
          'Date':event.totalvalue
        }
    };
  dynamo.putItem(dynamoRequest, function(err, data){
    if (err) console.log(err);
    else return cb(null, data);
  });
  
};