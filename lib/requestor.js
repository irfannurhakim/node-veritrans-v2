var request = require('request');

function Requestor(params){
  
}

Requestor.methodGET = function(endpoint, callback){
  var options = {
    "method" : "GET",
    "url" : endpoint
  }

  request(options, callback);
}

Requestor.methodPOST = function(params, auth, endpoint, callback){
  var options = {
    "method" : "POST",
    "url" : endpoint,
    "headers" : {
      "Content-type" : "application/json",
      "Accept" : "application/json",
      "Authorization" : "Basic " + auth
    },
    "body" : JSON.stringify(params)
  }

  request(options, callback);
}

module.exports = Requestor;