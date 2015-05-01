(function(){
  'use strict';

  angular.module('devshop').service('ShopSvc', function($http){

    this.save = function(developer) {
      var params = {
        developer: developer
      };

      return $http.post('', params);
    };

    this.get = function(page) {
      page = page || 1;
      
      return $http.get('/users?page='+page);
    };

  });
})();
