(function(){
  'use strict';

  angular.module('devshop').controller('ShopCtrl', function(ShopSvc){

    var vm = this;

    this.add = function(developer) {
      if(developer.hours > 0){
        vm.developers.push(developer);
        developer.onCart = true;

        var totalDevPrice = developer.price * developer.hours;

        addToTotal(totalDevPrice);
      }
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

      var totalDevPrice = developer.price * developer.hours;
      vm.total -= parseInt(totalDevPrice, 10);
    };

    this.loadNextPage = function() {
      ++vm.page;

      ShopSvc.get(vm.organization, vm.page, vm.pageSize).then(function(result){
        handleDevList(result);

        vm.hireDevelopers = vm.hireDevelopers.concat(result.data.developers);
        vm.hasMorePages = result.data.pagesLeft;
      });
    };

    this.getDeveloperList = function() {
      vm.page = 1;

      ShopSvc.get(vm.organization, vm.page, vm.pageSize).then(function(result){
        handleDevList(result);

        vm.hireDevelopers = result.data.developers;
        vm.hasMorePages = result.data.pagesLeft;
      });
    };

    function init() {
      vm.hireDevelopers = [];
      vm.developers = [];
      vm.total = 0;
      vm.hasMorePages = false;
      vm.page = 1;
      vm.pageSize = 5;
      vm.organization = '';

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

    function handleDevList(devs) {
      devs.data.developers.map(function(item){
        if(item.photo === '') item.photo = 'img/default.png';

        item.hours = 8;
        return item;
      });

      return devs;
    }

    init();

  });
})();
