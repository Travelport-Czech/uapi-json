var assert = require('assert');
var proxy = require('proxyquire');
var uAPI = require('../src/uapi-request');
var config = require('../src/config');
var auth = require('./testconfig');
var requests = require('../src/requests');
var ServiceErrors = require('../src/Errors/ServiceErrors');

var auth = {
  username: '123',
  password: '123'
};


describe('uapiRequest tests', function () {
  it('should return error request file not exists', function () {
    var missedFile = 'im the best missing filename';
    try {
      var someSerivce = uAPI(config().HotelsService.url, auth, missedFile);
    } catch (e) {
      assert(e instanceof ServiceErrors.TemplateFileMissing);
    }
  });

  it('should give empty data error', function () {
    var someSerivce = uAPI(config().HotelsService.url, auth, requests.HotelsService.HOTELS_SEARCH_REQUEST, null, null, null, function () { });

    return someSerivce().then(function (msg) { }, function (e) {
      assert(e instanceof ServiceErrors.ParamsMissing);
    });
  });

  it('should give undefined request error', function () {
    try {
      var someSerivce = uAPI(config().HotelsService.url, auth, requests.HotelsService.HOTELS_BLABALBAL);
    } catch (e) {
      assert(e instanceof ServiceErrors.RequestTypeUndefined);
    }
  });

  it('should give auth data error', function () {
    try {
      var someSerivce = uAPI(config().HotelsService.url, {}, requests.HotelsService.HOTELS_BLABALBAL);
    } catch (e) {
      assert(e instanceof ServiceErrors.AuthDataMissing);
    }
  });

  it('should give auth service url not provided error', function () {

    try {
      var someSerivce = uAPI('', auth, requests.HotelsService.HOTELS_BLABALBAL);
    } catch (e) {
      assert(e instanceof ServiceErrors.ServiceUrlMissing);
    }
  });
});
