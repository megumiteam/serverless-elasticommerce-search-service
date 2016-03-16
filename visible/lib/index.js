/**
 * Lib
 */

module.exports.searchword = function(event, cb) {
  
  var response = {
    message: "Your Serverless function ran successfully!"
  };

  return cb(null, event);
};