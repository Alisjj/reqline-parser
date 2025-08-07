const validator = require('@app-core/validator');
const { throwAppError, ERROR_CODE } = require('@app-core/errors');
const ParserMessages = require('../../messages/parser');
const {
  formUrl,
  extractBodyFromReq,
  extractHeaderFromReq,
  extractMethodFromReq,
  makeRequest,
  extractQueryFromReq,
} = require('./utils/reqline-helpers');

const parsedSpec = validator.parse(`root{
  reqline is a required string
  }`);

async function parseReqline(serviceData) {
  try {
    const data = validator.validate(serviceData, parsedSpec);

    if (!data.reqline || typeof data.reqline !== 'string') {
      throwAppError(ParserMessages.reqline_DATA_REQUIRED, ERROR_CODE.BADREQ);
    }

    const reqline = data.reqline.split('|');

    const method = extractMethodFromReq(reqline);
    const url = formUrl(reqline);
    const query = extractQueryFromReq(reqline);
    const body = extractBodyFromReq(reqline);
    const headers = extractHeaderFromReq(reqline);

    const requestStartTimestamp = Date.now();
    const response = await makeRequest(method, url, headers, method === 'POST' ? body : undefined);
    const requestStopTimestamp = Date.now();
    const duration = requestStopTimestamp - requestStartTimestamp;

    return {
      request: {
        query,
        body,
        headers,
        full_url: url.toString(),
      },
      response: {
        http_status: response.statusCode,
        duration,
        request_start_timestamp: requestStartTimestamp,
        request_stop_timestamp: requestStopTimestamp,
        response_data: response.data,
      },
    };
  } catch (error) {
    if (error.name === 'AppError') {
      throw error;
    }

    if (error.name === 'ValidationError') {
      throwAppError(ParserMessages.INVALID_reqline_FORMAT, ERROR_CODE.BADREQ);
    }

    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throwAppError(`Network request failed: ${error.message}`, ERROR_CODE.INTERNAL);
    }

    throwAppError(ParserMessages.PARSING_FAILED, ERROR_CODE.BADREQ);
  }
}

module.exports = parseReqline;
