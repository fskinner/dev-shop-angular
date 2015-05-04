var express = require('express');
var router = express.Router();
var request =     require('request');

router.get('/:org/users', function (req, res) {
  var page = req.query.page || 1;
  var per_page = req.query.per_page || 10;

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

    if(devs.constructor !== Array) devs = [];
    devs.forEach(function(el, index){
      users[index] = {
        username : el.login,
        photo : el.avatar_url,
        price : (el.login.length * 13 + index * el.login.length)/4 // 'random' price
      };
    });

    var islastPage;
    if(users.length > 0) islastPage = parsePage(response.headers.link, page);
    else islastPage = true;

    res.json({developers: users, pagesLeft: islastPage});
  });
});

function parsePage(url, currentPage) {
  url = url.split('<')[2].split('>')[0];
  var params = url.split('?')[1];
  var lastPage = params.split('&')[0].split('=')[1];

  return lastPage > currentPage;
}

module.exports = router;
