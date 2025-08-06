const { createHandler } = require('@app-core/server');

module.exports = createHandler({
  path: '/health',
  method: 'get',
  async handler(rc, helpers) {
    return {
      status: helpers.http_statuses.HTTP_200_OK,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'reqline-parser-api',
        version: '1.0.0',
      },
    };
  },
});
