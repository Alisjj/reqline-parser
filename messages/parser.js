const PARSING_FAILED = 'Failed to parse reqline data. Please check the format and try again.';
const INVALID_REQLINE_FORMAT = 'Invalid reqline format provided.';
const REQLINE_DATA_REQUIRED = 'reqline data is required for parsing.';
const PARSING_SUCCESS = 'reqline data parsed successfully.';
const MISSING_HTTP_KEYWORD = 'Missing required HTTP keyword';
const MISSING_URL_KEYWORD = 'Missing required URL keyword';
const INVALID_HTTP_METHOD = 'Invalid HTTP method. Only GET and POST are supported';
const HTTP_METHOD_UPPERCASE = 'HTTP method must be uppercase';
const INVALID_PIPE_SPACING = 'Invalid spacing around pipe delimiter';
const KEYWORDS_UPPERCASE = 'Keywords must be uppercase';
const MISSING_SPACE_AFTER_KEYWORD = 'Missing space after keyword';
const MULTIPLE_SPACES_FOUND = 'Multiple spaces found where single space expected';
const INVALID_JSON_HEADERS = 'Invalid JSON format in HEADERS section';
const INVALID_JSON_QUERY = 'Invalid JSON format in QUERY section';
const INVALID_JSON_BODY = 'Invalid JSON format in BODY section';

module.exports = {
  PARSING_FAILED,
  INVALID_REQLINE_FORMAT,
  REQLINE_DATA_REQUIRED,
  PARSING_SUCCESS,
  MISSING_HTTP_KEYWORD,
  MISSING_URL_KEYWORD,
  INVALID_HTTP_METHOD,
  HTTP_METHOD_UPPERCASE,
  INVALID_PIPE_SPACING,
  KEYWORDS_UPPERCASE,
  MISSING_SPACE_AFTER_KEYWORD,
  MULTIPLE_SPACES_FOUND,
  INVALID_JSON_HEADERS,
  INVALID_JSON_QUERY,
  INVALID_JSON_BODY,
};
