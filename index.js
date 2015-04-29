var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Accept", "application/vnd.github.v3+json");
    next();
});

var users = [];
var currentId = 1;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/users', function (req, res) {
  var newUser = req.body.user;
  newUser.id = currentId++;
  users.push(newUser);

  res.sendStatus(201);
});

app.get('/users', function (req, res) {
  res.json(users);
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

var server = app.listen(process.env.PORT || 3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
