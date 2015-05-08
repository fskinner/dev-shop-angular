var sinon       = require('sinon');
var chai        = require('chai');
var proxyquire  = require('proxyquire');
var assert      = chai.assert;

describe('OrgController', function() {
  var sut, reqMock, resMock, price;

  beforeEach(function() {
    requestMock = { query : {}, params : {} };
    responseMock = {};
    requestModuleMock = {};

    user = {username: 'testUser', photo: 'test.png', price: 26} // 26 === ('testUser'.length * 13 + 0 * 'testUser'.length)/4
    sut = proxyquire('../api/controllers/orgController', { 'request': requestModuleMock })
  });

  describe('#get', function() {
    it('returns the json', function() {
      responseMock.json = sinon.spy();
      requestModuleMock.get = sinon.stub().yields(null, { body : '[{"login":"testUser", "avatar_url":"test.png"}]', headers: { link : '' } });

      sut.get(requestMock, responseMock);

      assert(responseMock.json.called);
    });

    it('returns an array', function() {
      responseMock.json = sinon.spy();
      requestModuleMock.get = sinon.stub().yields(null, { body : '[{"login":"'+user.username+'", "avatar_url":"'+user.photo+'"}]', headers: { link : '' } });

      sut.get(requestMock, responseMock);

      assert(responseMock.json.calledWith({developers: [user], lastPage: true}));
    });

    it('returns 500 status code given an error', function() {
      responseMock.sendStatus = sinon.spy();
      requestModuleMock.get = sinon.stub().yields(new Error, {});

      sut.get(requestMock, responseMock);

      assert(responseMock.sendStatus.calledWith(500));
    });

    it('returns empty object array given an empty body', function() {
      responseMock.json = sinon.spy();
      requestModuleMock.get = sinon.stub().yields(null, { body : '""', headers: { link : '' } });

      sut.get(requestMock, responseMock);

      assert(responseMock.json.calledWith({developers: [], lastPage: true}));
    });
  });
});
