var DEV_BASE_URL = "https://api.sandbox.veritrans.co.id/v2";
var PROD_BASE_URL = "https://api.veritrans.co.id/v2";
var qs = require('querystring');
var Requestor = require('./lib/requestor');

function Veritrans(params){
	this.isDevelopment = params.isDevelopment;
	this.baseUrl = params.isDevelopment ? DEV_BASE_URL : PROD_BASE_URL;
	this.serverKey = this._generateAuthKey(params.serverKey);
  this.clientKey = params.clientKey;
  this.requestor = Requestor;
}

Veritrans.prototype.token = function(params, callback){
	if(!params) throw new Error('params required');

  var url = this.baseUrl + "/token?" + qs.stringify(params);
  this.requestor.methodGET(url, callback);
}

Veritrans.prototype.charge = function(params, callback){
	if(!params) throw new Error('params required');

  var url = this.baseUrl + "/charge";
  this.requestor.methodPOST(params, this.serverKey, url, callback);
}

Veritrans.prototype.capture = function (params, callback){
  if(!params) throw new Error('params required');

  var url = this.baseUrl + "/capture";
  this.requestor.methodPOST(params, this.serverKey, url, callback);
}

Veritrans.prototype.approve = function(params, callback){
  if(!params) throw new Error('params required');

  var pid = params.transaction_id || params.order_id;
  var url = this.baseUrl + "/" + pid + "/approve";
  this.requestor.methodPOST(params, this.serverKey, url, callback);
}

Veritrans.prototype.cancel = function(params, callback){
  if(!params) throw new Error('params required');

  var pid = params.transaction_id || params.order_id;
  var url = this.baseUrl + "/" + pid + "/cancel";
  this.requestor.methodPOST(params, this.serverKey, url, callback);
}

Veritrans.prototype.expire = function(params, callback){
  if(!params) throw new Error('params required');

  var pid = params.transaction_id || params.order_id;
  var url = this.baseUrl + "/" + pid + "/expire";
  this.requestor.methodPOST(params, this.serverKey, url, callback);
}

Veritrans.prototype.status = function(params, callback){
  if(!params) throw new Error('params required');

  var pid = params.transaction_id || params.order_id;
  var url = this.baseUrl + "/" + pid + "/status";
  this.requestor.methodGET(url, callback);
}

Veritrans.prototype.setDevelopmentMode = function(developmentMode){
	this.isDevelopment = developmentMode;
}

Veritrans.prototype.getDevelopmentMode = function(){
	return this.isDevelopment;
}

Veritrans.prototype.getServerKey = function(){
	return this.serverKey;
}

Veritrans.prototype._generateAuthKey = function(serverKey){
	return new Buffer(serverKey + ":").toString('base64');
}

Veritrans.prototype.setToken = function(token){
  this.tokenId = token;
}

Veritrans.prototype.getToken = function(){
  return this.tokenId;
}

module.exports = Veritrans;