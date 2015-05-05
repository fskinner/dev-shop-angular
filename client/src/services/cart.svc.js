(function(){
  'use strict';

  angular.module('devshop').service('CartSvc', function($http){

    this.add = function(developer) {
      return $http.post('/cart', {user: developer});
    };

    this.get = function(page, pageSize) {
      return $http.get('/cart');
    };

    this.delete = function(id) {
      return $http.delete('/cart/'+id);
    };
  });
})();
