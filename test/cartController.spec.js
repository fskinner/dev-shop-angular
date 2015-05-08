var sinon  = require('sinon');
var chai   = require('chai');
var assert = chai.assert;
var expect = chai.expect;

describe('CartController', function() {
  var sut, reqMock, resMock, userFirstPage;

  beforeEach(function() {
    requestMock = { query : {}, params : { id : 1 }, body : { user : { id: 1, hours: 1} } };
    responseMock = {};

    sut = require('../api/controllers/cartController');
  });

  describe('#get', function() {
    it('returns the json', function() {
      responseMock.json = sinon.spy();

      sut.get(requestMock, responseMock);

      assert(responseMock.json.called);
    });

    it('returns empty cart', function() {
      responseMock.json = sinon.spy();

      sut.get(requestMock, responseMock);

      assert(responseMock.json.calledWith([]));
    });
  });

  describe('#post', function() {
    it('returns 201 status code', function() {
      responseMock.sendStatus = sinon.spy();

      sut.post(requestMock, responseMock);

      assert(responseMock.sendStatus.calledWith(201));
    });

    it('returns 200 status code', function() {
      responseMock.sendStatus = sinon.spy();

      sut.post(requestMock, responseMock);
      sut.post(requestMock, responseMock); // adding the same user a second time so it wont return 201

      assert(responseMock.sendStatus.calledWith(200));
    });

    it('#get - does not return empty cart', function() {
      responseMock.json = sinon.spy();

      sut.get(requestMock, responseMock);

      expect(responseMock.json.calledWith([])).to.equal(false);
    });
  });

  describe('#delete', function() {
    it('returns 400 status code given an invalid id', function() {
      requestMock = { params : { id : 0 } };

      responseMock.sendStatus = sinon.spy();

      sut.delete(requestMock, responseMock);

      assert(responseMock.sendStatus.calledWith(400));
    });
    it('returns 200 status code', function() {
      responseMock.sendStatus = sinon.spy();

      sut.delete(requestMock, responseMock);

      assert(responseMock.sendStatus.calledWith(200));
    });

    it('#get - returns empty cart', function() {
      responseMock.json = sinon.spy();

      sut.get(requestMock, responseMock);

      assert(responseMock.json.calledWith([]));
    });
  });

  describe('#wipe', function() {
    it('returns 200 status code', function() {
      responseMock.sendStatus = sinon.spy();

      sut.wipe(requestMock, responseMock);

      assert(responseMock.sendStatus.calledWith(200));
    });

    it('#get - returns empty cart', function() {
      responseMock.json = sinon.spy();

      sut.get(requestMock, responseMock);

      assert(responseMock.json.calledWith([]));
    });
  });
});
