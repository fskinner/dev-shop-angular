var express = require('express');
var router = express.Router();

function initUsers() {
  users = [
    {id: 1041,    username: "joao",    price: "33", photo: ""},
    {id: 20073,   username: "jorge",   price: "41", photo: ""},
    {id: 2248,    username: "pedro",   price: "32",  photo: ""},
    {id: 4660,    username: "paulo",   price: "97", photo: ""},
    {id: 748,     username: "tom",     price: "37", photo: ""},
    {id: 10574,   username: "tomas",   price: "7",  photo: ""},
    {id: 14319,   username: "thiago",  price: "12",  photo: ""},
    {id: 145949,  username: "tereza",  price: "66", photo: ""},
    {id: 15557,   username: "sofia",   price: "75", photo: ""},
    {id: 322,     username: "luke",    price: "70", photo: ""},
    {id: 1681405, username: "maria",   price: "34", photo: ""},
    {id: 2823287, username: "eduarda", price: "40", photo: ""},
    {id: 3530,    username: "renato",  price: "31",  photo: ""},
    {id: 22728,   username: "flavio",  price: "96", photo: ""},
    {id: 772,     username: "alex",    price: "37", photo: ""},
    {id: 2631,    username: "tobias",  price: "8",  photo: ""},
    {id: 635,     username: "daniel",  price: "11",  photo: ""},
    {id: 676210,  username: "pele",    price: "66", photo: ""},
    {id: 849872,  username: "orlando", price: "77", photo: ""},
    {id: 192618,  username: "leia",    price: "70", photo: ""}
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
