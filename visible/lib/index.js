/**
 * Lib
 */

var aws = require("aws-sdk");
var doc = require('dynamodb-doc');
aws.config.update({region: "ap-northeast-1"});
var dynamo = new doc.DynamoDB();

const stage = process.env.SERVERLESS_STAGE;
const projectName = process.env.SERVERLESS_PROJECT_NAME;
const table = projectName + '-' + stage + '-ProductSerarchTotalvalue';

module.exports.searchword = function(event, cb) { 
  if ( event.httpMethod === 'GET' ) {
    GetResult(event, cb);
  } else {
    PostResult(event, cb);
  }
};

function GetResult(event, cb) {
  if ( event.start_date === 'undefined' || event.end_date === 'undefined' ) {
  	return cb(null, 'error');
  }
  
  if ( event.searchword ) {
    var dynamoRequest = {
        TableName: table,
        KeyConditions: [
            dynamo.Condition("SearchWord", "EQ", event.searchword),
            dynamo.Condition("Date", "BETWEEN", Number(event.start_date), Number(event.end_date))
        ]
    };
    dynamo.query(dynamoRequest, function(err, data){
      if (err) console.log(err);
      else return cb(null, data);
    });
  } else {
    var dynamoRequest = {
        TableName: table,
        ScanFilter: [
            dynamo.Condition("Date", "BETWEEN", Number(event.start_date), Number(event.end_date))
        ]
    };
    dynamo.scan(dynamoRequest, function(err, data){
      if (err) console.log(err);
      else return cb(null, data);
    });
  }
}

function PostResult(event, cb) {
  var now = new Date();
  var dynamoRequest = {
        TableName: table,
        Key: {
          "SearchWord": event.searchword,
          "Date": Number(ISODateString(now))
        },
        UpdateExpression:"SET ProductInfo = :productinfo, TotalValue = :totalvalue",
        ExpressionAttributeValues: {
          ":productinfo":event.productinfo,
          ":totalvalue":Number(event.totalvalue)
        }
    };
  dynamo.updateItem(dynamoRequest, function(err, data){
    if (err) console.log(err);
    else return cb(null, data);
  });
}

function ISODateString(d){
  function pad(n){return n<10 ? '0'+n : n}
  return d.getUTCFullYear()
    + pad(d.getUTCMonth()+1)
    + pad(d.getUTCDate())
    + pad(d.getUTCHours())
    + pad(d.getUTCMinutes())
    + pad(d.getUTCSeconds())
}