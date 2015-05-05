(function(){
  'use strict';

  angular.module('devshop').service('ShopSvc', function($http){

    this.get = function(org, page, pageSize) {
      page = page || 1;
      pageSize = pageSize || 10;
      org = org || '';

      if(org === ''){
        return $http.get('/users?page='+page+'&per_page='+pageSize);
      }

      return $http.get('/orgs/'+org+'/users?page='+page+'&per_page='+pageSize);
    };
  });
})();
