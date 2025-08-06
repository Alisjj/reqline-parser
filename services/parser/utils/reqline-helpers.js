const { throwAppError, ERROR_CODE } = require('@app-core/errors');
const { URL } = require('url'); // For Node.js compatibility
const ParserMessages = require('../../../messages/parser');

function extractHeaderFromReq(reqlineData) {
  const headerItem = reqlineData.find((item) => item.includes('HEADERS'));
  if (headerItem) {
    try {
      const headerString = headerItem.split('HEADERS')[1].replace(/'/g, '"');
      const jsonData = JSON.parse(headerString);
      return jsonData;
    } catch (error) {
      throwAppError(ParserMessages.INVALID_JSON_HEADERS, ERROR_CODE.BADREQ);
    }
  }
  return {};
}

function extractUrlfromReq(reqlineData) {
  const urlItem = reqlineData.find((item) => item.includes('URL'));
  if (urlItem) {
    const urlString = urlItem.split('URL')[1].trim();
    return urlString;
  }
  throwAppError(ParserMessages.MISSING_URL_KEYWORD, ERROR_CODE.BADREQ);
}

function extractQueryFromReq(reqlineData) {
  const queryItem = reqlineData.find((item) => item.includes('QUERY'));
  if (queryItem) {
    try {
      const queryString = queryItem.split('QUERY')[1].replace(/'/g, '"');
      const jsonData = JSON.parse(queryString);
      return jsonData;
    } catch (error) {
      throwAppError(ParserMessages.INVALID_JSON_QUERY, ERROR_CODE.BADREQ);
    }
  }
  return {};
}

function extractBodyFromReq(reqlineData) {
  const bodyItem = reqlineData.find((item) => item.includes('BODY'));
  if (bodyItem) {
    try {
      const bodyString = bodyItem.split('BODY')[1].replace(/'/g, '"');
      const body = JSON.parse(bodyString);
      return body;
    } catch (error) {
      throwAppError(ParserMessages.INVALID_JSON_BODY, ERROR_CODE.BADREQ);
    }
  }
  return {};
}

function extractMethodFromReq(reqlineData) {
  const methodItem = reqlineData.find((item) => item.includes('HTTP'));
  if (methodItem) {
    const method = methodItem.split('HTTP')[1].trim();

    if (!method) {
      throwAppError(ParserMessages.MISSING_HTTP_KEYWORD, ERROR_CODE.BADREQ);
    }

    const validMethods = ['GET', 'POST'];
    if (!validMethods.includes(method.toUpperCase())) {
      throwAppError(ParserMessages.INVALID_HTTP_METHOD, ERROR_CODE.BADREQ);
    }

    if (method !== method.toUpperCase()) {
      throwAppError(ParserMessages.HTTP_METHOD_UPPERCASE, ERROR_CODE.BADREQ);
    }

    return method;
  }
  throwAppError(ParserMessages.MISSING_HTTP_KEYWORD, ERROR_CODE.BADREQ);
}

function formUrl(reqlineData) {
  const urlString = extractUrlfromReq(reqlineData);
  const query = extractQueryFromReq(reqlineData);

  try {
    const url = new URL(urlString);
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    return url;
  } catch (error) {
    throwAppError(ParserMessages.MISSING_URL_KEYWORD, ERROR_CODE.BADREQ);
  }
}

async function makeRequest(method, url, headers, body) {
  return fetch(url.toString(), {
    method,
    headers,
    body: JSON.stringify(body),
  });
}

module.exports = {
  extractQueryFromReq,
  extractUrlfromReq,
  extractHeaderFromReq,
  extractMethodFromReq,
  extractBodyFromReq,
  makeRequest,
  formUrl,
};
