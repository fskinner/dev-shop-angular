'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

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

var currentId = 1;

app.post('/users', function (req, res) {
  var newUser = req.body.user;
  newUser.id = currentId++;
  users.push(newUser);

  res.sendStatus(201);
});

app.get('/org/:org/users', function (req, res) {
  var page = req.query.page || 1;
  var per_page = req.query.per_page || 5;

  var org = req.params.org;

  var opt = {
    headers : {
      'Accept': 'application/vnd.github.moondragon+json',
      'User-Agent': 'fskinner'
    },
    url : 'https://api.github.com/orgs/'+org+'/members?page='+page+'&per_page='+per_page
  };

  request.get(opt, function (error, response) {
    if(error != undefined) return res.sendStatus(500);

    users = [];
    var devs = JSON.parse(response.body);

    devs.forEach(function(el, index){
      users[index] = {
        username : el.login,
        photo : el.avatar_url,
        price : (el.login.length * 13 + index * el.login.length)/4
      };
    });

    var lastPage = parsePage(response.headers.link);

    res.json({developers: users, pagesLeft: lastPage > page});
  });

  function parsePage(url) {
    var link = url;
    link = link.split('<')[2].split('>')[0];

    var params = link.split('?')[1];

    var lastPage = params.split('&')[0].split('=')[1];

    return lastPage;
  }

});

app.get('/users', function (req, res) {
  initUsers();

  var page = req.query.page - 1 || 0;
  var perPage = req.query.per_page || 5;
  var current = page*perPage;

  var usersPage = users.slice(current, perPage + current);

  res.json({developers: usersPage, pagesLeft: perPage + current < users.length});
});

function initUsers() {
  users = [
    {username: "joao",    price: "100", photo: ""},
    {username: "jorge",   price: "121", photo: ""},
    {username: "pedro",   price: "97",  photo: ""},
    {username: "paulo",   price: "290", photo: ""},
    {username: "tom",     price: "111", photo: ""},
    {username: "tomas",   price: "22",  photo: ""},
    {username: "thiago",  price: "35",  photo: ""},
    {username: "tereza",  price: "198", photo: ""},
    {username: "sofia",   price: "230", photo: ""},
    {username: "luke",    price: "210", photo: ""},
    {username: "maria",   price: "100", photo: ""},
    {username: "eduarda", price: "121", photo: ""},
    {username: "renato",  price: "97",  photo: ""},
    {username: "flavio",  price: "290", photo: ""},
    {username: "alex",    price: "111", photo: ""},
    {username: "tobias",  price: "22",  photo: ""},
    {username: "daniel",  price: "35",  photo: ""},
    {username: "pelé",    price: "198", photo: ""},
    {username: "orlando", price: "230", photo: ""},
    {username: "léia",    price: "210", photo: ""}
  ];
}

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

app.route('*')
    .get(function(req, res) {
      res.sendFile(__dirname + '/public/index.html');
    });

var server = app.listen(process.env.PORT || 3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at port %s ...', port);
});
