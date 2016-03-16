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
    GetResult(event);
  } else {
    PostResult(event, cb);
  }

  return cb(null, event);
};

function GetResult(event) {

}

function PostResult(event, cb) {
  var now = new Date();

  var dynamoRequest = {
        TableName: table,
        Key: {
          "SearchWord": event.word,
          "Date": ISODateString(now)
        },
        UpdateExpression:"ADD TotalValue :totalvalue, #ct :count SET ProductName = :productname",
        ExpressionAttributeNames : {
          "#ct"  : "Count"
        },
        ExpressionAttributeValues: {
          ":totalvalue":Number(event.totalvalue), 
          ":productname":event.productname,
          ":count":Number(event.count)
        }
    };
  dynamo.updateItem(dynamoRequest, function(err, data){
    if (err) console.log(err);
    else return cb(null, data);
  });
}

function ISODateString(d){
  function pad(n){return n<10 ? '0'+n : n}
  return d.getUTCFullYear()+'-'
    + pad(d.getUTCMonth()+1)+'-'
    + pad(d.getUTCDate())
}