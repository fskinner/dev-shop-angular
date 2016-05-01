(function(){
  'use strict';

  angular.module('devshop').controller('CartCtrl', ['CartSvc', function(cartSvc) {

    let vm = this;

    this.remove = function(developer) {
      var oldArray = vm.developers;
      vm.developers = vm.developers.filter(dev =>  dev.id !== developer.id);
      developer.onCart = false;

      cartSvc.delete(developer.id).then(() => vm.calcPrice())
        .catch(() => {
          developer.onCart = true;
          vm.developers = oldArray;
        });
    };

    this.calcPrice = function() {
      vm.total = vm.developers.reduce((total, dev) => total + (parseInt(dev.price, 10) * parseInt(dev.hours, 10)));

      if(vm.redeemed === true) {
        vm.total = vm.total * 0.9;
      }
    };

    this.validateVoucher = function() {
      if(vm.voucher === 'SHIPIT') {
        vm.redeemed = true;
      }

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

      cartSvc.clear().catch(() => vm.developers = oldArray);
    };

    function init() {
      vm.developers = [];

      vm.voucher = '';
      vm.total = 0;
      vm.redeemed = false;

      getCart();
    }

    function getCart() {
      cartSvc.get().then((result) => {
        vm.developers = result.data;
        vm.calcPrice();
      });
    }

    init();

  }]);
})();
