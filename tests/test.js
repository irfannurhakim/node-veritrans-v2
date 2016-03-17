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

	it('should return error from veritrans when send empty object', function(done){
		var params = {};
		vt.charge(params, function(a,b,c){
			assert.equal(JSON.parse(c).status_code, "500");
			done();
		});
	});

	it('should retrun ok when send actual data', function(done){
		var params = {
			"payment_type": "credit_card",
			"transaction_details": {
				"order_id": "C17550",
				"gross_amount": 145000
			},
			"credit_card": {
				"token_id": "1234134324"
			},
			"item_details": [{
				"id": "a1",
				"price": 50000,
				"quantity": 2,
				"name": "Apel"
			}, {
				"id": "a2",
				"price": 45000,
				"quantity": 1,
				"name": "Jeruk"
			}],
			"customer_details": {
				"first_name": "Andri",
				"last_name": "Litani",
				"email": "andri@litani.com",
				"phone": "081122334455",
				"billing_address": {
					"first_name": "Andri",
					"last_name": "Litani",
					"address": "Mangga 20",
					"city": "Jakarta",
					"postal_code": "16602",
					"phone": "081122334455",
					"country_code": "IDN"
				},
				"shipping_address": {
					"first_name": "Obet",
					"last_name": "Supriadi",
					"address": "Manggis 90",
					"city": "Jakarta",
					"postal_code": "16601",
					"phone": "08113366345",
					"country_code": "IDN"
				}
			}
		}
			
		vt.charge(params, function(a,b,c){
			console.log(c);
			assert.equal(JSON.parse(c).status_code, "500");
			done();
		});
	});
});