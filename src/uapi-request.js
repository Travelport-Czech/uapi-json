const Mustache = require('consolidate').handlebars;
const fs = require('fs');
const request = require('request');
const Promise = require('promise');
const ParserUapi = require('./uapi-parser');
const _ = require('lodash');

// making default functions work with promises
const readFile = Promise.denodeify(fs.readFile);
const ServiceErrors = require('./Errors/ServiceErrors');
const configInit = require('./config');

/**
 * basic function for requests/responses
 * @param  {string} service          service url for current response (gateway)
 * @param  {object} auth             {username,password} - credentials
 * @param  {string} reqType          url to file with xml for current request
 * @param  {function} validateFunction function for validation
 * @param  {function} errorHandler    function that gets SOAP:Fault object and handle error
 * @param  {function} parseFunction    function for transforming json soap object to normal object
 * @param  {boolean} debugMode        true - log requests, false - dont
 * @return {Promise}                  returning promise for best error handling ever)
 */
module.exports = function (service, auth, reqType, rootObject,
  validateFunction, errorHandler, parseFunction, debugMode = false) {
  const config = configInit(auth.region || 'emea');

  if (debugMode > 2) {
    console.log('Starting working with ', reqType, toString());
  }

  if (service.length <= 0) {
    throw new ServiceErrors.ServiceUrlMissing();
  }

  if (!auth || auth.username === undefined || auth.password === undefined) {
    throw new ServiceErrors.AuthDataMissing();
  }

  if (reqType === undefined) {
    throw new ServiceErrors.RequestTypeUndefined();
  }
  // @todo: make static index of services available
  if (fs.existsSync(reqType) === false) {
    throw new ServiceErrors.TemplateFileMissing(null, { requestType: reqType });
  }

  return function serviceFunc(params) {
    if (debugMode) {
      console.log('Input params ', params);
    }

    const validateInput = (resolve, reject) => {
      if (_.isEmpty(params)) {
        reject(new ServiceErrors.ParamsMissing());
      }
      params = validateFunction(params);
      resolve(reqType);
    };

    const prepareRequest = function (data) {
      // adding target branch param from auth variable and render xml
      params.TargetBranch = auth.targetBranch;
      params.Username = auth.username;
      params.pcc = auth.pcc;
      const renderedObj = Mustache.render(data.toString(), params);
      return renderedObj;
    };

    const sendRequest = function (xml) {
      if (debugMode) console.log('Request XML: ', xml);
      return new Promise((resolve, reject) => {
        request({
          url: service, // URL to hit
          method: 'POST',
          timeout: config.timeout || 5000,
          gzip: true,
          auth: {
            user: auth.username,
            pass: auth.password,
            sendImmediately: true,
          },
          body: xml,
        }, (error, response) => {
          if (!error) {
            if (debugMode > 1) console.log('Response SOAP: ', response.body);
            resolve(response);
          } else {
            if (debugMode) console.log('Error Response SOAP: ', JSON.stringify(error));
            if (error.code === 'ETIMEDOUT') {
              reject(new ServiceErrors.SoapRequestTimeout());
            } else {
              reject(new ServiceErrors.SoapRequestError());
            }
          }
        });
      });
    };

    // create a v36 uAPI parser with default params and request data in env
    const uParser = new ParserUapi(rootObject, 'v36_0', params);

    const parseResponse = function (response) {
      // if there are web server or HTTP auth errors, uAPI returns a JSON
      let data = null;
      try {
        data = JSON.parse(response.body);
      } catch (err) {
        return uParser.parse(response.body);
      }

      // @todo: parse JSON errors
      // @todo: change into UAPI_SERVER_ERROR, etc
      throw new ServiceErrors.AuthDataMissing(null, data);
    };

    const validateSOAP = function (parsedXML) {
      if (parsedXML['SOAP:Fault']) {
        if (debugMode) console.log('Parsed error response', JSON.stringify(parsedXML));
        return errorHandler(parsedXML['SOAP:Fault']);
      } else
                if (debugMode > 1) console.log('Parsed response', JSON.stringify(parsedXML));

      return parsedXML;
    };

    const handleSuccess = function (result) {
      if (debugMode > 1) console.log('Returning result', JSON.stringify(result));
      return result;
    };


    return new Promise(validateInput)
            .then(readFile)
            .then(prepareRequest)
            .then(sendRequest)
            .then(parseResponse)
            .then(validateSOAP)
            // @todo: merge Hotels
            .then(parseFunction.bind(uParser))
            .then(handleSuccess);
  };
};
