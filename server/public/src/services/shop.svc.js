(function(){
  'use strict';

  angular.module('devshop').service('ShopSvc', function($http){

    this.save = function(developer) {
      var params = {
        developer: developer
      };

      return $http.post('', params);
    };

    this.get = function(org, page, pageSize) {
      page = page || 1;
      pageSize = pageSize || 5;
      org = org || '';

      if(org === ''){
        return $http.get('/users?page='+page);
      }

      return $http.get('/org/'+org+'/users?page='+page+'&per_page='+pageSize);
    };

  });
})();
