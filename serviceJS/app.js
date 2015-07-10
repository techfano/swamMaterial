/*
https://github.com/petersirka/node-mongolab
https://github.com/auth0/node-jsonwebtoken
http://code.tutsplus.com/es/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543
*/

var express = require('express')
var app = express()

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/academydb');

var errorResponseText ='Error in authentication, user or Password.';
var expiredMinutesSession = 600;
var hashPhrase = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.';

var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var user = require('./model/user.model');


app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.json());

app.use(function(req, res, next) {

	res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();

});

app.set('json spaces', 2);

function authorized(req, res, next) {
	
	var header = req.headers["authorization"];
    
    jwt.verify(req.params.token, hashPhrase, function(err, decoded) {

    	if(err){
  			res.status(403);
  			res.send(errorResponseText);
  		}else{
			next();
  		}

    });

}

app.get('/api/auth/login/:username/:password', function(req, res) {

	var params = {

		where:{
			username:req.params.username,
			password:req.params.password
		}

	};

	user.find(params, function(err, data) {
  		if (err) throw err;

  		console.log(data);
  		res.send(data);
	});
  
	/*mongodb.documents('user', params, function(err,data){

			var auth={};

			if(data[0]){

				var token = jwt.sign(data[0], hashPhrase,{ expiresInMinutes: expiredMinutesSession });

				if(req.params.username === data[0].username && req.params.password === data[0].password){
					auth.token = token;
					res.send(auth);				
				}else{				
					res.status(401);
					res.send(errorResponseText);				
				}
			}else{
				res.status(403);
				res.send(errorResponseText);						
			}
		
	});*/


});

app.post('/api/user/create', function(req, res) {

	var newUser = user(req.body);
	console.log(req.body);
	if (!req.body){ 
		return res.sendStatus(400);
	}else{

		newUser.save(function(err) {
		  if (err){ res.send(err); };
		  res.send('User created!');
		});

	}

});



/*app.get('/api/auth/verify/:token',authorized,function(req, res){

	jwt.verify(req.params.token, hashPhrase, function(err, decoded) {
  		if(err){
  			res.status(403);
  			res.send(err);
  		}else{
  			
			delete decoded.password;
			delete decoded.username;  			
  			res.send(decoded);

  		}
	});

});

app.get('/api/user/me/:id',authorized, function(req, res) {

	mongodb.findId('user', req.params.id, function(err,user){

		delete user.password;
		delete user.username;

		res.send(user);

	});

});*/

app.listen(80);
console.log("App listening on port 80");


