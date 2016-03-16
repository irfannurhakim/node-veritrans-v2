var assert = require('assert');
var Veritrans = require('../veritrans');
var vt = new Veritrans({isDevelopment: true, serverKey: 'My Server Key'});

describe('Veritrans App', function(){
	it('should return type of Veritrans Object', function(){
		assert.equal(typeof vt, 'object');
	});

	it('should set to development mode', function(){
		assert.equal(true, vt.getDevelopmentMode());
	});

	it('should return development base url', function(){
		assert.equal('https://api.sandbox.veritrans.co.id/v2', vt.baseUrl);
	});
});