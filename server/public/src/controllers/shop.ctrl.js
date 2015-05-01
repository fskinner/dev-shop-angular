(function(){
  'use strict';

  angular.module('devshop').controller('ShopCtrl', function(ShopSvc){

    var vm = this;

    this.add = function(developer) {
      vm.developers.push(developer);
      developer.onCart = true;

      addToTotal(developer.price);
    };

    this.addFromInput = function() {
      var developer = {};
      developer.username = vm.username;
      developer.price = vm.price;

      vm.developers.push(developer);
      clearInputFields();

      addToTotal(developer.price);
    };

    this.remove = function(developer) {
      var index = vm.developers.indexOf(developer);
      vm.developers.splice(index, 1);
      developer.onCart = false;

      vm.total -= parseInt(developer.price, 10);
    };

    this.getDeveloperList = function() {
      ShopSvc.get(vm.page).then(function(result){
        result.data.developers.map(function(item){
          item.photo = 'img/'+item.photo;
          return item;
        });

        vm.hireDevelopers = vm.hireDevelopers.concat(result.data.developers);
        vm.hasMorePages = result.data.pagesLeft;
      });
      vm.page++;
    };

    function init() {
      vm.hireDevelopers = [];
      vm.developers = [];
      vm.total = 0;
      vm.hasMorePages = false;
      vm.page = 1;

      clearInputFields();
      vm.getDeveloperList();
    }

    function clearInputFields() {
      vm.username = '';
      vm.price = '';
    }

    function addToTotal(value) {
      vm.total += parseInt(value, 10);
    }

    init();

  });
})();
