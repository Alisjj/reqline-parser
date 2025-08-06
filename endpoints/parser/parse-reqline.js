const { createHandler } = require('@app-core/server');
const parseCursorService = require('../../services/parser/parse-reqline');

module.exports = createHandler({
  path: '/',
  method: 'post',
  async handler(rc, helpers) {
    const payload = rc.body;
    payload.requestMeta = rc.properties;

    const response = await parseCursorService(payload);
    return {
      status: helpers.http_statuses.HTTP_200_OK,
      data: response,
    };
  },
});
