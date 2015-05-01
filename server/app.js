'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Accept", "application/vnd.github.v3+json");
    next();
});

var users = [];
users = [
  {username: "joao",    price: "100", photo: "default.png"},
  {username: "jorge",   price: "121", photo: "default.png"},
  {username: "pedro",   price: "97",  photo: "default.png"},
  {username: "paulo",   price: "290", photo: "default.png"},
  {username: "tom",     price: "111", photo: "default.png"},
  {username: "tomas",   price: "22",  photo: "default.png"},
  {username: "thiago",  price: "35",  photo: "default.png"},
  {username: "tereza",  price: "198", photo: "default.png"},
  {username: "sofia",   price: "230", photo: "default.png"},
  {username: "luke",    price: "210", photo: "default.png"},
  {username: "maria",   price: "100", photo: "default.png"},
  {username: "eduarda", price: "121", photo: "default.png"},
  {username: "renato",  price: "97",  photo: "default.png"},
  {username: "flavio",  price: "290", photo: "default.png"},
  {username: "alex",    price: "111", photo: "default.png"},
  {username: "tobias",  price: "22",  photo: "default.png"},
  {username: "daniel",  price: "35",  photo: "default.png"},
  {username: "pelé",    price: "198", photo: "default.png"},
  {username: "orlando", price: "230", photo: "default.png"},
  {username: "léia",    price: "210", photo: "default.png"}
]

var currentId = 1;

app.post('/users', function (req, res) {
  var newUser = req.body.user;
  newUser.id = currentId++;
  users.push(newUser);

  res.sendStatus(201);
});

app.get('/users', function (req, res) {
  var page = req.query.page - 1 || 0;
  var perPage = req.query.per_page || 5;
  var current = page*perPage;

  var usersPage = users.slice(current, perPage + current);

  res.json({developers: usersPage, pagesLeft: perPage + current < users.length});
});

app.delete('/users/:id', function (req, res) {
  var id = req.params.id;

  for(var i = 0, len = messages.length; i<len; i++){
    if(messages[i].id == id) {
        messages.splice(i, 1);
        return res.sendStatus(200);
    }
  }

  res.sendStatus(400);
});

// app.get('/users/:org', function (req, res){
//   var org = req.params.org;
// });

app.route('*')
    .get(function(req, res) {
      res.sendFile(__dirname + '/public/index.html');
    });

var server = app.listen(process.env.PORT || 3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at port %s ...', port);
});
