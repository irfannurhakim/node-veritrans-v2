var assert = require('assert');
var Veritrans = require('../veritrans');
var params = { "isDevelopment": true, "serverKey": "VT-server-YMm3gKChvw8aRjMCIEU1frtl", "clientKey" : "VT-client-RrZ9EtG8fIH8UliB" }; 
var vt = new Veritrans(params);
var guid = require('node-uuid');
var orderId = guid.v4();

describe('Veritrans App Init', function(){
	it('should return type of Veritrans Object', function(){
		assert.equal(typeof vt, 'object');
	});

	it('should set to development mode', function(){
		assert.equal(vt.getDevelopmentMode(), params.isDevelopment);
	});

	it('should retrun server key', function(){
		assert.equal(vt.getServerKey(), vt._generateAuthKey(params.serverKey));
	});

	it('should return development base url', function(){
		assert.equal(vt.baseUrl, 'https://api.sandbox.veritrans.co.id/v2');
	});
});

describe('Get Token Method', function(){
	it('should return token from veritrans', function(done){
		var payload = {
			"card_number" : 4811111111111114,
			"card_exp_month" : "01",
			"card_exp_year" : 2020,
			"card_cvv" : 123,
			"secure" : false,
			"gross_amount" : 145000,
			"client_key" : params.clientKey
		}

		vt.token(payload, function(a,b,c){
			assert.equal(JSON.parse(c).status_code, "200");
			vt.setToken(JSON.parse(c).token_id);
			done();
		});
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
		var payload = {};
		vt.charge(payload, function(a,b,c){
			assert.equal(JSON.parse(c).status_code, "400");
			done();
		});
	});

	it('should retrun ok when send actual data', function(done){
		var payload = {
			"payment_type": "credit_card",
			"transaction_details": {
				"order_id": orderId,
				"gross_amount": 145000
			},
			"credit_card": {
				"token_id": vt.getToken()
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
			
		vt.charge(payload, function(a,b,c){
			assert.equal(JSON.parse(c).status_code, "200");
			done();
		});
	});
});

describe('Get Transaction Status Method', function(){
	it('shuould return transaction status', function(done){
		var payload = {
			"order_id" : orderId
		}
		vt.status(payload, function(a,b,c){
			assert.equal(JSON.parse(c).status_code, "200");
		});
		done();
	});
});
