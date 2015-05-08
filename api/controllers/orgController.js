var request = require('request');

var orgController = {
  get : function (req, res) {
    var page = parseInt(req.query.page, 10) || 1;
    var per_page = parseInt(req.query.per_page, 10) || 10;

    var org = req.params.org;

    var opt = {
      headers : {
        'Accept': 'application/vnd.github.moondragon+json',
        'User-Agent': 'fskinner'
      },
      url : 'https://api.github.com/orgs/'+org+'/members?page='+page+'&per_page='+per_page
    };

    request.get(opt, function (error, response) {
      if(error) return res.sendStatus(500);

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

      var isLastPage;
      if(users.length > 0) isLastPage = parseLastPage(page, response.headers.link);
      else isLastPage = true;

      res.json({developers: users, lastPage: isLastPage});
    });
  }
};

function parseLastPage(currentPage, url) {
  if(!url) return true;

  url = url.split('<')[2].split('>')[0];
  var params = url.split('?')[1];
  var lastPage = params.split('&')[0].split('=')[1];

  return currentPage >= lastPage;
}

module.exports = orgController;
