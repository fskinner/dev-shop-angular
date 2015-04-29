(function(){
  'use strict';

  angular.module('devshop').factory('ShopSvc', function($http){
    this.save = function(developer) {
      var params = {
        developer: developer
      }

      return $http.post('', params);
    }
  });
})();
