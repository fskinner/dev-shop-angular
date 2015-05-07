describe('ShopCtrl', function () {
  var currentPage = 1;
  var defaultPage = 1;
  var defaultPageSize = 10;
  var users = [
    { id : 1 },
    { id : 2 },
    { id : 3 },
    { id : 4 },
    { id : 5 }
  ];
  var usersLastPage = [
    { id : 6 },
    { id : 7 }
  ];
  var cart_dev = { id : 1, onCart : true };
  var cart_dev_fail = { id : 2, onCart : true };
  var add_dev = { id : 1, hours : 8, onCart : false };
  var add_dev_invalid_hours = { id : 2, hours : 0, onCart : false };
  var add_dev_fail = { id : 3, hours : 8, onCart : false };

    var $scope,
        $controller,
        $httpBackend,
        shopSvcMock,
        cartSvcMock,
        vm;

    beforeEach(function () {
        module('devshop');

        shopSvcMock = jasmine.createSpyObj('shopSvc', ['get']);
        cartSvcMock = jasmine.createSpyObj('cartSvc', ['add', 'delete']);

        module(function ($provide) {
            $provide.value('cartSvc', cartSvcMock);
            $provide.value('shopSvc', shopSvcMock);
        });

        inject(function (_$controller_, _$rootScope_, _$httpBackend_) {
            $scope = _$rootScope_.$new();
            $httpBackend = _$httpBackend_;
            $controller = _$controller_;
        });

        $httpBackend.when('GET', '/users?page='+defaultPage+'&per_page='+defaultPageSize).respond(200, {developers: users, lastPage: false});
        $httpBackend.when('GET', '/orgs/angular/users?page='+defaultPage+'&per_page='+defaultPageSize).respond(200, {developers: users, lastPage: false});

        $controller('ShopCtrl', { $scope: $scope });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('initializes developers list', function () {
      var vm = $controller('ShopCtrl', { $scope: $scope });
      expect(vm.developers).toEqual([]);
      $httpBackend.flush();
    });

    it('initializes organization', function () {
      var vm = $controller('ShopCtrl', { $scope: $scope });
      expect(vm.organization).toEqual('');
      $httpBackend.flush();
    });

    it('initializes lastPage', function () {
      var vm = $controller('ShopCtrl', { $scope: $scope });
      expect(vm.lastPage).toEqual(true);
      $httpBackend.flush();
    });

    it('initializes page', function () {
      var vm = $controller('ShopCtrl', { $scope: $scope });
      expect(vm.page).toEqual(1);
      $httpBackend.flush();
    });

    it('initializes page size', function () {
      var vm = $controller('ShopCtrl', { $scope: $scope });
      expect(vm.pageSize).toEqual(10);
      $httpBackend.flush();
    });

    describe('#clearInputFields', function() {
      it('initializes username', function () {
        var vm = $controller('ShopCtrl', { $scope: $scope });
        expect(vm.username).toEqual('');
        $httpBackend.flush();
      });

      it('initializes price', function () {
        var vm = $controller('ShopCtrl', { $scope: $scope });
        expect(vm.price).toEqual('');
        $httpBackend.flush();
      });

      it('initializes hours', function () {
        var vm = $controller('ShopCtrl', { $scope: $scope });
        expect(vm.hours).toEqual(8);
        $httpBackend.flush();
      });
    });

    describe('#getDeveloperList', function(){
      it('populates the developers variable', function() {
        var vm = $controller('ShopCtrl', { $scope: $scope });

        vm.getDeveloperList();
        $httpBackend.flush();

        expect(vm.developers.length).toEqual(5);
      });
    });

    describe('#remove', function(){
      it('removes from cart given valid request', function() {
        $httpBackend.when('DELETE', '/cart/'+cart_dev.id).respond(200);
        var vm = $controller('ShopCtrl', { $scope: $scope });

        vm.remove(cart_dev);
        $httpBackend.flush();

        expect(cart_dev.onCart).toEqual(false);
      });

      it('doesnt removes from cart if an error occurs', function() {
        $httpBackend.when('DELETE', '/cart/'+cart_dev_fail.id).respond(400);
        var vm = $controller('ShopCtrl', { $scope: $scope });

        vm.remove(cart_dev_fail);
        $httpBackend.flush();

        expect(cart_dev_fail.onCart).toEqual(true);
      });
    });

    describe('#loadNextPage', function() {
      it('gets the next page of users', function() {
        $httpBackend.when('GET', '/users?page='+(defaultPage+1)+'&per_page='+defaultPageSize).respond(200, {developers: usersLastPage, lastPage: true});
        var vm = $controller('ShopCtrl', { $scope: $scope });
        vm.lastPage = false;

        vm.loadNextPage();
        $httpBackend.flush();

        expect(vm.developers.length).toEqual(7);
      });

      it('increments the page variable', function() {
        $httpBackend.when('GET', '/users?page='+(defaultPage+1)+'&per_page='+defaultPageSize).respond(200, {developers: usersLastPage, lastPage: true});
        var vm = $controller('ShopCtrl', { $scope: $scope });
        vm.lastPage = false;

        vm.loadNextPage();
        $httpBackend.flush();

        expect(vm.page).toEqual(2);
      });
    });

    describe('#add', function() {
      it('adds a developer to the cart', function() {
        $httpBackend.when('POST', '/cart').respond(201);
        var vm = $controller('ShopCtrl', { $scope: $scope });

        vm.add(add_dev);
        $httpBackend.flush();

        expect(add_dev.onCart).toEqual(true);
      });

      it('does nothing given an invalid amount of hours', function() {
        var vm = $controller('ShopCtrl', { $scope: $scope });

        vm.add(add_dev_invalid_hours);
        $httpBackend.flush();

        expect(add_dev_invalid_hours.onCart).toEqual(false);
      });

      it('does not add to the cart given an error', function() {
        $httpBackend.when('POST', '/cart').respond(400);
        var vm = $controller('ShopCtrl', { $scope: $scope });

        vm.add(add_dev_fail);
        $httpBackend.flush();

        expect(add_dev_fail.onCart).toEqual(false);
      });
    });
});
