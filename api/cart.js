var express = require('express');
var router = express.Router();

var hired_users = [];

router.post('/', function (req, res) {
  var user = req.body.user;
  hired_users.push(user);

  res.sendStatus(201);
});

router.get('/', function(req, res, next) {
  res.json(hired_users);
});

router.delete('/:id', function (req, res) {
  var id = req.params.id;

  for(var i = 0, len = hired_users.length; i<len; i++){
    if(hired_users[i].id == id) {
      hired_users.splice(i, 1);
        return res.sendStatus(200);
    }
  }

  res.sendStatus(400);
});

module.exports = router;