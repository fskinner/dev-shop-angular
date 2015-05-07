(function(){
  'use strict';

  angular.module('devshop').controller('CartCtrl', ['CartSvc', function(cartSvc){

    var vm = this;

    this.remove = function(developer) {
      var index = vm.developers.indexOf(developer);
      vm.developers.splice(index, 1);
      developer.onCart = false;

      cartSvc.delete(developer.id).then(function(){
        vm.calcPrice();
      }).catch(function(){
        developer.onCart = true;
        vm.developers.splice(index, 0, developer);
      });
    };

    this.calcPrice = function() {
      vm.total = 0;
      vm.developers.forEach(function(dev){
        vm.total += parseInt(dev.price, 10) * parseInt(dev.hours, 10);
      });

      if(vm.redeemed === true) vm.total = vm.total * 0.9;
    };

    this.validateVoucher = function() {
      if(vm.voucher === 'SHIPIT') vm.redeemed = true;

      vm.calcPrice();
    };

    this.removeVoucher = function() {
      vm.redeemed = false;
      vm.voucher = '';

      vm.calcPrice();
    };

    this.checkout = function() {
      var oldArray = vm.developers;
      vm.developers = [];

      cartSvc.clear().catch(function(){
        vm.developers = oldArray;
      });
    };

    function init() {
      vm.developers = [];

      vm.voucher = '';
      vm.total = 0;
      vm.redeemed = false;

      getCart();
    }

    function getCart() {
      cartSvc.get().then(function(result){
        vm.developers = result.data;
        vm.calcPrice();
      });
    }

    init();

  }]);
})();
