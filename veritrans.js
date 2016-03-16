var DEV_BASE_URL = "https://api.sandbox.veritrans.co.id/v2";
var PROD_BASE_URL = "https://api.veritrans.co.id/v2";

function Veritrans(params){
	this.isDevelopment = params.isDevelopment;
	this.baseUrl = params.isDevelopment ? DEV_BASE_URL : PROD_BASE_URL;
	this.serverKey = params.serverKey;
}

Veritrans.prototype.charge = function(params){
	if(!params) throw new Error('params required');
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

module.exports = Veritrans;