var sinon  = require('sinon');
var chai   = require('chai');
var assert = chai.assert;

describe('UserController', function() {
  var sut, reqMock, resMock, userFirstPage;

  beforeEach(function() {
    requestMock = { query : {} };
    responseMock = {};
    userFirstPage = [
      {id: 1041,    username: "joao",    price: "33", photo: ""},
      {id: 20073,   username: "jorge",   price: "41", photo: ""},
      {id: 2248,    username: "pedro",   price: "32",  photo: ""},
      {id: 4660,    username: "paulo",   price: "97", photo: ""},
      {id: 748,     username: "tom",     price: "37", photo: ""},
      {id: 10574,   username: "tomas",   price: "7",  photo: ""},
      {id: 14319,   username: "thiago",  price: "12",  photo: ""},
      {id: 145949,  username: "tereza",  price: "66", photo: ""},
      {id: 15557,   username: "sofia",   price: "75", photo: ""},
      {id: 322,     username: "luke",    price: "70", photo: ""}
    ];

    sut = require('../api/controllers/userController');
  });

  describe('#get', function() {
    it('returns the json', function() {
      responseMock.json = sinon.spy();

      sut.get(requestMock, responseMock);

      assert(responseMock.json.called);
    });

    it('returns the first page of users', function() {
      responseMock.json = sinon.spy();

      sut.get(requestMock, responseMock);

      assert(responseMock.json.calledWith({developers: userFirstPage, lastPage: false}));
    });
  });
});
