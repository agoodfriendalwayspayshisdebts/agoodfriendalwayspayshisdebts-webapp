'use strict';

let config = require('12factor-config');

let appConfig = config({
  apiUrl: {
    env: 'AGFAPHD_WEBAPP_API_URL',
    type: 'string',
    default: 'http://localhost:8089'
  },
  emailApiKey: {
    env: 'AGFAPHD_WEBAPP_EMAIL_API_KEY',
    type: 'string',
    required: true
  },
  emailApiUrl: {
    env: 'AGFAPHD_WEBAPP_EMAIL_API_URL',
    type: 'string',
    required: true
  },
  emailFrom: {
    env: 'AGFAPHD_WEBAPP_EMAIL_FROM',
    type: 'string',
    default: 'Debt Sentry <sentry@agoodfriendalwayspayshisdebts.com>'
  },
  serverPort: {
    env: 'PORT',
    type: 'integer',
    default: 5000
  }
});

module.exports = appConfig;
