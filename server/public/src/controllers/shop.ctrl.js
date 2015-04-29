(function(){
  'use strict';

  angular.module('devshop').controller('ShopCtrl', function(){
    var vm = this;

    this.add = function() {
      var developer = {};
      developer.username = vm.username;
      developer.price = vm.price;

      vm.developers.push(developer);
      clearInputFields();
    }

    this.remove = function(developer) {
      var index = vm.developers.indexOf(developer);
      vm.developers.splice(index, 1);
    }

    function init() {
      vm.developers = [];
      var priceTotal = 0;
      clearInputFields();
    }

    function clearInputFields() {
      vm.username = '';
      vm.price = '';
    }

    init();
  });
})();
