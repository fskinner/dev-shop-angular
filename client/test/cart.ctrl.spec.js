describe('CartCtrl', function () {
  // var currentPage = 1;
  // var defaultPage = 1;
  // var defaultPageSize = 10;
  var users = [
    { id : 1, onCart : true, price: 10, hours: 1 },
    { id : 2, onCart : true, price: 10, hours: 1 },
    { id : 3, onCart : true, price: 10, hours: 1 },
    { id : 4, onCart : true, price: 10, hours: 1 },
    { id : 5, onCart : true, price: 10, hours: 1 }
  ];
  // var usersLastPage = [
  //   { id : 6 },
  //   { id : 7 }
  // ];
  var cart_dev = users[0];
  // var cart_dev_fail = { id : 2, onCart : true };
  // var add_dev = { id : 1, hours : 8, onCart : false };
  // var add_dev_invalid_hours = { id : 2, hours : 0, onCart : false };
  // var add_dev_fail = { id : 3, hours : 8, onCart : false };

    var $scope,
        $controller,
        $httpBackend,
        shopSvcMock,
        cartSvcMock,
        vm;

    beforeEach(function () {
        module('devshop');

        cartSvcMock = jasmine.createSpyObj('cartSvc', ['delete', 'clear', 'get']);

        module(function ($provide) {
            $provide.value('cartSvc', cartSvcMock);
        });

        inject(function (_$controller_, _$rootScope_, _$httpBackend_) {
            $scope = _$rootScope_.$new();
            $httpBackend = _$httpBackend_;
            $controller = _$controller_;
        });

        $httpBackend.when('GET', '/cart').respond(200, users);

        $controller('CartCtrl', { $scope: $scope });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('initializes developers list', function () {
      var vm = $controller('CartCtrl', { $scope: $scope });
      expect(vm.developers).toEqual([]);
      $httpBackend.flush();
    });

    it('initializes voucher', function () {
      var vm = $controller('CartCtrl', { $scope: $scope });
      expect(vm.voucher).toEqual('');
      $httpBackend.flush();
    });

    it('initializes total', function () {
      var vm = $controller('CartCtrl', { $scope: $scope });
      expect(vm.total).toEqual(0);
      $httpBackend.flush();
    });

    it('initializes redeemed', function () {
      var vm = $controller('CartCtrl', { $scope: $scope });
      expect(vm.redeemed).toEqual(false);
      $httpBackend.flush();
    });

    describe('#getCart', function() {
      it('populates developers variable', function() {
        var vm = $controller('CartCtrl', { $scope: $scope });

        $httpBackend.flush();

        expect(vm.developers).toEqual(users);
        expect(vm.developers.length).toEqual(5);
      });

      it('calculates the total price', function() {
        var vm = $controller('CartCtrl', { $scope: $scope });

        $httpBackend.flush();

        expect(vm.total).toEqual(50);
      });
    });

    describe('#remove', function() {
      it('removes developer from cart', function() {
        var vm = $controller('CartCtrl', { $scope: $scope });
        $httpBackend.flush();

        $httpBackend.when('DELETE', '/cart/'+cart_dev.id).respond(200);
        vm.remove(cart_dev);
        $httpBackend.flush();

        expect(cart_dev.onCart).toEqual(false);
      });

      it('removes developer from devs array', function() {
        var vm = $controller('CartCtrl', { $scope: $scope });
        $httpBackend.flush();

        $httpBackend.when('DELETE', '/cart/'+cart_dev.id).respond(200);
        vm.remove(cart_dev);
        $httpBackend.flush();

        expect(vm.developers.length).toEqual(4);
      });

      it('subtracts developers price from total', function() {
        var vm = $controller('CartCtrl', { $scope: $scope });
        $httpBackend.flush();

        $httpBackend.when('DELETE', '/cart/'+cart_dev.id).respond(200);
        vm.remove(cart_dev);
        $httpBackend.flush();

        expect(vm.total).toEqual(40);
      });

      describe('on failure', function() {
        it('does not remove developer from cart', function() {
          var vm = $controller('CartCtrl', { $scope: $scope });
          $httpBackend.flush();

          $httpBackend.when('DELETE', '/cart/'+cart_dev.id).respond(400);
          vm.remove(cart_dev);
          $httpBackend.flush();

          expect(cart_dev.onCart).toEqual(true);
        });

        it('does not remove developer from devs array', function() {
          var vm = $controller('CartCtrl', { $scope: $scope });
          $httpBackend.flush();

          $httpBackend.when('DELETE', '/cart/'+cart_dev.id).respond(400);
          vm.remove(cart_dev);
          $httpBackend.flush();

          expect(vm.developers.length).toEqual(5);
        });

        it('does not subtract developers price from total', function() {
          var vm = $controller('CartCtrl', { $scope: $scope });
          $httpBackend.flush();

          $httpBackend.when('DELETE', '/cart/'+cart_dev.id).respond(400);
          vm.remove(cart_dev);
          $httpBackend.flush();

          expect(vm.total).toEqual(50);
        });
      });
    });

    describe('#validateVoucher', function() {
      it('gives discount', function() {
        var vm = $controller('CartCtrl', { $scope: $scope });
        $httpBackend.flush();
        vm.voucher = 'SHIPIT';
        vm.validateVoucher();

        expect(vm.total).toEqual(45);
      });

      it('redeems the voucher', function() {
        var vm = $controller('CartCtrl', { $scope: $scope });
        $httpBackend.flush();
        vm.voucher = 'SHIPIT';
        vm.validateVoucher();

        expect(vm.redeemed).toEqual(true);
      });

      describe('on invalid voucher', function() {
        it('does not give discount', function() {
          var vm = $controller('CartCtrl', { $scope: $scope });
          $httpBackend.flush();

          vm.validateVoucher();

          expect(vm.total).toEqual(50);
        });

        it('does not redeem the voucher', function() {
          var vm = $controller('CartCtrl', { $scope: $scope });
          $httpBackend.flush();

          vm.validateVoucher();

          expect(vm.redeemed).toEqual(false);
        });
      });
    });

    describe('#removeVoucher', function() {
      it('removes the discount', function() {
        var vm = $controller('CartCtrl', { $scope: $scope });
        $httpBackend.flush();

        vm.voucher = 'SHIPIT';
        vm.validateVoucher();
        vm.removeVoucher();

        expect(vm.total).toEqual(50);
      });

      it('removes the voucher', function() {
        var vm = $controller('CartCtrl', { $scope: $scope });
        $httpBackend.flush();

        vm.voucher = 'SHIPIT';
        vm.validateVoucher();
        vm.removeVoucher();

        expect(vm.voucher).toEqual('');
      });

      it('removes the redeemed flag', function() {
        var vm = $controller('CartCtrl', { $scope: $scope });
        $httpBackend.flush();

        vm.voucher = 'SHIPIT';
        vm.validateVoucher();
        vm.removeVoucher();

        expect(vm.redeemed).toEqual(false);
      });
    });

    describe('#checkout', function() {
      it('clears developer array', function() {
        var vm = $controller('CartCtrl', { $scope: $scope });
        $httpBackend.flush();

        $httpBackend.when('DELETE', '/cart').respond(200);
        vm.checkout();
        $httpBackend.flush();

        expect(vm.developers).toEqual([]);
      });

      describe('on failure', function() {
        it('does not clear developer array', function() {
          var vm = $controller('CartCtrl', { $scope: $scope });
          $httpBackend.flush();

          $httpBackend.when('DELETE', '/cart').respond(400);
          vm.checkout();
          $httpBackend.flush();

          expect(vm.developers).toEqual(users);
        });
      });
    });
});
