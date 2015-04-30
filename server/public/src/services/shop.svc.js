(function(){
  'use strict';

  angular.module('devshop').service('ShopSvc', function(){

    this.save = function(developer) {
      var params = {
        developer: developer
      };

      return $http.post('', params);
    };
    
  });
})();
