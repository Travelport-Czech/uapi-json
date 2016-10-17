const ce = require('node-custom-errors');
const BaseError = require('./base-error');

const ServiceErrors = new ce.Block({
  // Base Error
  Base: BaseError,
  // ValidationError
  ValidationError: ['Base', 'Service params validation error'],
  ServiceUrlMissing: ['ValidationError', 'Service URL is missing'],
  AuthDataMissing: ['ValidationError', 'Auth data is missing'],
  ParamsMissing: ['ValidationError', 'Params for function are missing'],
  RequestTypeUndefined: ['ValidationError', 'Undefined request type'],
  // RuntimeError
  RuntimeError: ['Base', 'Runtime error'],
  TemplateFileMissing: ['RuntimeError', 'XML template not found for request'],
  UnhandledError: ['RuntimeError', 'Error during request. Please try again later'],
  ResultsMissing: ['RuntimeError', 'Missing results in response'],
  // SoapError
  SoapError: ['RuntimeError', 'Error occurred while executing SOAP call'],
  SoapRequestError: ['SoapError', 'Error during request to SOAP API. Check url validity'],
  SoapRequestTimeout: ['SoapError', 'SOAP response timeout'],
  SoapParsingError: ['SoapError', 'SOAP response parsing failed'],
}, 'uAPIJson.Errors.Service', BaseError);

module.exports = ServiceErrors;
