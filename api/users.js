var express = require('express');
var router = express.Router();

function initUsers() {
  users = [
    {id: 1041,    username: "joao",    price: "100", photo: ""},
    {id: 20073,   username: "jorge",   price: "121", photo: ""},
    {id: 2248,    username: "pedro",   price: "97",  photo: ""},
    {id: 4660,    username: "paulo",   price: "290", photo: ""},
    {id: 748,     username: "tom",     price: "111", photo: ""},
    {id: 10574,   username: "tomas",   price: "22",  photo: ""},
    {id: 14319,   username: "thiago",  price: "35",  photo: ""},
    {id: 145949,  username: "tereza",  price: "198", photo: ""},
    {id: 15557,   username: "sofia",   price: "230", photo: ""},
    {id: 322,     username: "luke",    price: "210", photo: ""},
    {id: 1681405, username: "maria",   price: "100", photo: ""},
    {id: 2823287, username: "eduarda", price: "121", photo: ""},
    {id: 3530,    username: "renato",  price: "97",  photo: ""},
    {id: 22728,   username: "flavio",  price: "290", photo: ""},
    {id: 772,     username: "alex",    price: "111", photo: ""},
    {id: 2631,    username: "tobias",  price: "22",  photo: ""},
    {id: 635,     username: "daniel",  price: "35",  photo: ""},
    {id: 676210,  username: "pele",    price: "198", photo: ""},
    {id: 849872,  username: "orlando", price: "230", photo: ""},
    {id: 192618,  username: "leia",    price: "210", photo: ""}
  ];
}

router.get('/', function(req, res, next) {
  initUsers();
  var page = parseInt(req.query.page, 10) || 1;
  var perPage = parseInt(req.query.per_page, 10) || 10;
  var current = (page - 1)*perPage;

  var usersPage = users.slice(current, perPage + current);

  res.json({developers: usersPage, lastPage: perPage + current >= users.length});
});

module.exports = router;
