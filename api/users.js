var express = require('express');
var router = express.Router();

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

router.post('/', function (req, res) {
  var newUser = req.body.user;
  newUser.id = currentId++;
  users.push(newUser);

  res.sendStatus(201);
});

router.get('/', function(req, res, next) {
  initUsers();

  var page = req.query.page - 1 || 0;
  var perPage = req.query.per_page || 10;
  var current = page*perPage;

  var usersPage = users.slice(current, perPage + current);

  res.json({developers: usersPage, pagesLeft: perPage + current < users.length});
});

router.delete('/:id', function (req, res) {
  var id = req.params.id;

  for(var i = 0, len = messages.length; i<len; i++){
    if(messages[i].id == id) {
        messages.splice(i, 1);
        return res.sendStatus(200);
    }
  }

  res.sendStatus(400);
});

module.exports = router;
