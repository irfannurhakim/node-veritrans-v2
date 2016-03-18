var DEV_BASE_URL = "https://api.sandbox.veritrans.co.id/v2";
var PROD_BASE_URL = "https://api.veritrans.co.id/v2";
var request = require('request');

function Veritrans(params){
	this.isDevelopment = params.isDevelopment;
	this.baseUrl = params.isDevelopment ? DEV_BASE_URL : PROD_BASE_URL;
	this.serverKey = this._generateAuthKey(params.serverKey);
}

Veritrans.prototype.tokenize = function(params, callback){
	if(!params) throw new Error('params required');
}

Veritrans.prototype.charge = function(params, callback){
	if(!params) throw new Error('params required');

	var options = {
		"method" : "POST",
		"url" : this.baseUrl + "/charge",
		"headers" : {
			"Content-type" : "application/json",
			"Accept" : "application/json",
			"Authorization" : "Basic " + this.serverKey
		},
		"body" : JSON.stringify(params)
	}

	request(options, callback);
}

Veritrans.prototype.capture = function (params){

}

Veritrans.prototype.approve = function(params){

}

Veritrans.prototype.cancel = function(params){

}

Veritrans.prototype.expire = function(params){

}

Veritrans.prototype.getTransactionStatus = function(params){

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

module.exports = Veritrans;