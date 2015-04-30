(function(){
  'use strict';

  angular.module('devshop').controller('ShopCtrl', function(ShopSvc){

    var vm = this;

    this.add = function() {
      var developer = {};
      developer.username = vm.username;
      developer.price = vm.price;

      vm.developers.push(developer);
      clearInputFields();

      vm.total += parseInt(developer.price, 10);
    };

    this.remove = function(developer) {
      var index = vm.developers.indexOf(developer);
      vm.developers.splice(index, 1);

      vm.total -= parseInt(developer.price, 10);
    };

    function init() {
      vm.developers = [];
      vm.total = 0;

      clearInputFields();
    }

    function clearInputFields() {
      vm.username = '';
      vm.price = '';
    }

    init();

  });
})();
