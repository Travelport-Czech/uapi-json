const ce = require('node-custom-errors');
const BaseError = require('./base-error');

const HotelErrors = new ce.Block({
  // Base Error
  Base: BaseError,
  // ValidationError
  ValidationError: ['Base', 'Validation error'],
  LocationMissing: ['ValidationError', 'Missing location in request'],
  StartDateMissing: ['ValidationError', 'Missing startDate in request'],
  EndDateMissing: ['ValidationError', 'Missing endDate in request'],
  RoomsMissing: ['ValidationError', 'Missing rooms in request'],
  HotelChainMissing: ['ValidationError', 'Missing HotelChain in request'],
  HotelCodeMissing: ['ValidationError', 'Missing HotelCode in request'],
  VendorLocationKeyMissing: ['ValidationError', 'Missing VendorLocationKey in request'],
  LocatorCodeMissing: ['ValidationError', 'Missing LocatorCode in request'],
  // TravellersError
  TravellersError: ['ValidationError', 'Travellers information is incorrect'],
  AdultsMissing: ['TravellersError', 'Missing adults in request'],
  ChildrenMissing: ['TravellersError', 'Missing children in request'],
  ChildrenAgeInvalid: ['TravellersError', 'Need to set correct child age'],
  TravellersMissing: ['TravellersError', 'Missing travellers in request'],
  FirstNameMissing: ['TravellersError', 'Missing FirstName in request'],
  LastNameMissing: ['TravellersError', 'Missing LastName in request'],
  PrefixNameMissing: ['TravellersError', 'Missing PrefixName in request'],
  NationalityMissing: ['TravellersError', 'Missing Nationality in request'],
  BirthDateMissing: ['TravellersError', 'Missing BirthDate in request'],
  AreaCodeMissing: ['TravellersError', 'Missing AreaCode in request'],
  CountryCodeMissing: ['TravellersError', 'Missing CountryCode in request'],
  NumberMissing: ['TravellersError', 'Missing Number in request'],
  EmailMissing: ['TravellersError', 'Missing Email in request'],
  // AddressError
  AddressError: ['ValidationError', 'Address information is incorrect'],
  CountryMissing: ['AddressError', 'Missing Country in request'],
  CityMissing: ['AddressError', 'Missing City in request'],
  StreetMissing: ['AddressError', 'Missing Street in request'],
  PostalCodeMissing: ['AddressError', 'Missing PostalCode in request'],
  // GuaranteeError
  GuaranteeError: ['Base', 'Guarantee error'],
  GuaranteeMissing: ['GuaranteeError', 'Missing Guarantee'],
  CvvMissing: ['GuaranteeError', 'Missing CVV'],
  ExpDateMissing: ['GuaranteeError', 'Missing ExpDate'],
  CardNumberMissing: ['GuaranteeError', 'Missing CardNumber'],
  CardTypeMissing: ['GuaranteeError', 'Missing CardType'],
  CardHolderMissing: ['GuaranteeError', 'Missing CardHolder'],
  RatesMissing: ['GuaranteeError', 'Missing rates'],
  TotalMissing: ['GuaranteeError', 'Missing Total price'],
  SurchargeMissing: ['GuaranteeError', 'Missing Surcharge'],
  TaxMissing: ['GuaranteeError', 'Missing Tax'],
  BaseMissing: ['GuaranteeError', 'Missing Base price'],
  RateSupplierMissing: ['GuaranteeError', 'Missing RateSupplier'],
  RatePlanTypeMissing: ['GuaranteeError', 'Missing RatePlanType'],
  RateOfferIdMissing: ['GuaranteeError', 'Missing RateOfferId'],
  HostTokenMissing: ['GuaranteeError', 'Missing HostToken'],
  CurrenciesMissing: ['GuaranteeError', 'Missing currencies'],
  // ParsingError
  ParsingError: ['Base', 'Parsing error'],
  SearchParsingError: ['ParsingError', 'Cant parse XML repsonse. #HotelsParser.searchParse()'],
  MediaParsingError: ['ParsingError', 'Cant parse XML repsonse. #HotelsParser.mediaParse()'],
  RatesParsingError: ['ParsingError', 'Cant parse XML repsonse. #HotelsParser.ratesParse()'],
  RateParsingError: ['ParsingError', 'Cant parse XML repsonse. #HotelsParser.rateParse()'],
  BookingParsingError: ['ParsingError', 'Cant parse XML repsonse. #HotelsParser.bookParse()'],
  CancelBookingParsingError: [
    'ParsingError',
    'Cant parse XML repsonse. #HotelsParser.cancelBookParse()',
  ],
  // RuntimeError
  RuntimeError: ['Base', 'Runtime error'],
  NoEnginesResults: ['RuntimeError', 'None of the enabled engines could fulfill your request'],
  NoCityResults: ['RuntimeError', 'Cant find hotels for selected city'],
}, 'uAPIJson.Errors.Hotel', BaseError);

module.exports = HotelErrors;
