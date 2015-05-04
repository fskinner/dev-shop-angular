(function(){
  'use strict';

  angular.module('devshop',['ngRoute'])
  .config(['$locationProvider', function($locationProvider) {
	   $locationProvider.html5Mode(true);
  }])
  .config(['$routeProvider', function($routeProvider) {

  	$routeProvider.when('/home', {
  		templateUrl: '/src/views/shop.html'
  	})
    .when('/cart', {
      templateUrl: '/src/views/cart.html'
    })
  	.when('/checkout', {
  		templateUrl:'/src/views/checkout.html',
  	})
    .otherwise({
  		redirectTo: '/home'
  	});

  }]);
})();
