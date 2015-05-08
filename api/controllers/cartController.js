var cartController = {
  get : function(req, res, next) {
    res.json(hired_users);
  },

  post : function (req, res) {
    var user = req.body.user;

    for(var i = 0, len = hired_users.length; i<len; i++){
      if(hired_users[i].id == user.id) {
        hired_users[i].hours += user.hours;
          return res.sendStatus(200);
      }
    }

    hired_users.push(user);
    res.sendStatus(201);
  },

  delete : function (req, res) {
    var id = req.params.id;

    for(var i = 0, len = hired_users.length; i<len; i++){
      if(hired_users[i].id == id) {
        hired_users.splice(i, 1);
          return res.sendStatus(200);
      }
    }

    res.sendStatus(400);
  },

  wipe : function (req, res) {
    hired_users = [];

    res.sendStatus(200);
  }
};

var hired_users = [];

module.exports = cartController;
