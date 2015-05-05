(function(){
  'use strict';

  angular.module('devshop').controller('ShopCtrl', function(CartSvc, ShopSvc){

    var vm = this;
    var id = 0;

    this.add = function(developer) {
      if(developer.hours > 0){
        developer.onCart = true;

        CartSvc.add(developer).catch(function(){
          developer.onCart = false;
        });
      }
    };

    this.addFromInput = function() {
      var developer = {};
      if(vm.hours > 0){
        developer.username = vm.username;
        developer.price = vm.price;
        developer.hours = vm.hours;
        developer.id = ++id;

        CartSvc.add(developer);

        clearInputFields();
      }
    };

    this.remove = function(developer) {
      developer.onCart = false;

      CartSvc.delete(developer.id).catch(function(){
        developer.onCart = true;
      });
    };

    this.loadNextPage = function() {
      if(!vm.lastPage) {
        ++vm.page;

        ShopSvc.get(vm.organization, vm.page, vm.pageSize).then(function(result){
          handleDevList(result);

          vm.developers = vm.developers.concat(result.data.developers);
          vm.lastPage = result.data.lastPage;
        });
      }
    };

    this.getDeveloperList = function() {
      vm.page = 1;

      ShopSvc.get(vm.organization, vm.page, vm.pageSize).then(function(result){
        handleDevList(result);

        vm.developers = result.data.developers;
        vm.lastPage = result.data.lastPage;
      }, function(){
        vm.developers = [];
        vm.lastPage = true;
      });
    };

    function init() {
      vm.developers = [];
      vm.organization = '';

      vm.lastPage = true;
      vm.page = 1;
      vm.pageSize = 10;

      clearInputFields();
      vm.getDeveloperList();
    }

    function clearInputFields() {
      vm.username = '';
      vm.price = '';
      vm.hours = 0;
    }

    function handleDevList(devs) {
      devs.data.developers = devs.data.developers || [];
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