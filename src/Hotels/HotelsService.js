const uApiRequest = require('../uapi-request');
const requests = require('../requests');
const HotelsParser = require('./HotelsParser');
const HotelsValidator = require('./HotelsValidator');
const config = require('../config');
const UError = require('../errors');

const HotelsErrors = function (err) {
  let errno = 0;
  try {
    errno = err[0].detail[0]['common_v34_0:ErrorInfo'][0]['common_v34_0:Code'][0];
  } catch (e) {
    console.log('Error not parsed');
  }
  switch (errno * 1) {
    case 4965:
      throw new UError('EMPTY_RESULTS', err);
    case 5000:
      throw new UError('GENERAL_ERROR', err);
    case 5574:
      throw new UError('NO_ENGINES_RESULTS', err);
    default:
      throw new UError('UNHANDLED_ERROR', err);
  }
};

module.exports = function (settings) {
  const auth = settings.auth;
  const debug = settings.debug;
  const production = settings.production;
  return {
    search: uApiRequest(
            config(auth.region, production).HotelsService.url,
            auth,
            requests.HotelsService.HOTELS_SEARCH_REQUEST,
            null,
            HotelsValidator.HOTELS_SEARCH_REQUEST,
            HotelsErrors,
            HotelsParser.HOTELS_SEARCH_REQUEST,
            debug
        ),
    searchGalileo: uApiRequest(
            config(auth.region, production).HotelsService.url,
            auth,
            requests.HotelsService.HOTELS_SEARCH_GALILEO_REQUEST,
            null,
            HotelsValidator.HOTELS_SEARCH_GALILEO_REQUEST,
            HotelsErrors,
            HotelsParser.HOTELS_SEARCH_GALILEO_REQUEST,
            debug
        ),
    rates: uApiRequest(
            config(auth.region, production).HotelsService.url,
            auth,
            requests.HotelsService.HOTELS_RATE_REQUEST,
            null,
            HotelsValidator.HOTELS_RATE_REQUEST,
            HotelsErrors,
            HotelsParser.HOTELS_RATE_REQUEST,
            debug
        ),
    book: uApiRequest(
            config(auth.region, production).HotelsService.url,
            auth,
            requests.HotelsService.HOTELS_BOOK_REQUEST,
            null,
            HotelsValidator.HOTELS_BOOK_REQUEST,
            HotelsErrors,
            HotelsParser.HOTELS_BOOK_REQUEST,
            debug
        ),
    cancelBook: uApiRequest(
            config(auth.region, production).UniversalRecord.url,
            auth,
            requests.HotelsService.HOTELS_CANCEL_BOOK_REQUEST,
            null,
            HotelsValidator.HOTELS_CANCEL_BOOK_REQUEST,
            HotelsErrors,
            HotelsParser.HOTELS_CANCEL_BOOK_REQUEST,
            debug
        ),
  };
};
