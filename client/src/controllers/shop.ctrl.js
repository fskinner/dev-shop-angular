(function(){
  'use strict';

  angular.module('devshop').controller('ShopCtrl', ['CartSvc', 'ShopSvc', function(cartSvc, shopSvc) {

    let vm = this;
    let id = 0;

    this.add = function(developer) {
      if(developer.hours > 0){
        developer.onCart = true;

        cartSvc.add(developer).catch(() => developer.onCart = false);
      }
    };

    this.addFromInput = function() {
      const { username, price, hours } = vm;
      if(vm.hours > 0){
        var developer = {
          id: ++id,
          username,
          price,
          hours
        };

        cartSvc.add(developer);

        clearInputFields();
      }
    };

    this.remove = function(developer) {
      developer.onCart = false;

      cartSvc.delete(developer.id).catch(() => developer.onCart = true);
    };

    this.loadNextPage = function() {
      if(!vm.lastPage) {
        ++vm.page;

        shopSvc.get(vm.organization, vm.page, vm.pageSize).then((result) => {
          handleDevList(result);

          vm.developers = [ ...vm.developers, ...result.data.developers];
          vm.lastPage = result.data.lastPage;
        });
      }
    };

    this.getDeveloperList = function() {
      vm.page = 1;

      shopSvc.get(vm.organization, vm.page, vm.pageSize).then((result) => {
        handleDevList(result);

        vm.developers = result.data.developers;
        vm.lastPage = result.data.lastPage;
      }, () => {
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
      vm.hours = 8;
    }

    function handleDevList(devs) {
      devs.data.developers = devs.data.developers || [];
      devs.data.developers.map((item) => {
        item.hours = 8;
        if(item.photo === '') {
          item.photo = 'img/default.png';
        }

        return item;
      });

      return devs;
    }

    init();

  }]);
})();
