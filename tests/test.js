var assert = require('assert');
var Veritrans = require('../veritrans');
var params = { isDevelopment: true, serverKey: 'VT-server-YMm3gKChvw8aRjMCIEU1frtl' }; 
var vt = new Veritrans(params);

describe('Veritrans App Init', function(){
	it('should return type of Veritrans Object', function(){
		assert.equal(typeof vt, 'object');
	});

	it('should set to development mode', function(){
		assert.equal(vt.getDevelopmentMode(), params.isDevelopment);
	});

	it('should retrun server key', function(){
		assert.equal(vt.getServerKey(), params.serverKey);
	});

	it('should return development base url', function(){
		assert.equal(vt.baseUrl, 'https://api.sandbox.veritrans.co.id/v2');
	});
});


describe('Charge Method', function(){
	it('should return type of charge method', function(){
		assert.equal(typeof vt.charge, 'function');
	});

	it('should return error when params not qualified', function(){
		(function(){ vt.charge().should.throw() });
	});
});