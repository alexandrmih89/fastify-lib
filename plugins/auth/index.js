const oauthPlugin = require('fastify-oauth2');
const fastify = require('../../fastify');

const {
  GOOGLE_ID,
  GOOGLE_SECRET,
  FACEBOOK_ID,
  FACEBOOK_SECRET,
  BASE_URL,
} = process.env;

fastify.register(require('./jwt'));

fastify.register(oauthPlugin, {
  name: 'facebookOAuth2',
  credentials: {
    client: {
      id: FACEBOOK_ID,
      secret: FACEBOOK_SECRET,
    },
    auth: oauthPlugin.FACEBOOK_CONFIGURATION,
  },
  // register a fastify url to start the redirect flow
  startRedirectPath: '/login/facebook',
  // facebook redirect here after the user login
  callbackUri: `${BASE_URL}login/facebook/callback`
});

fastify.register(oauthPlugin, {
  name: 'googleOAuth2',
  scope: ['profile'],
  credentials: {
    client: {
      id: GOOGLE_ID,
      secret: GOOGLE_SECRET,
    },
    auth: oauthPlugin.GOOGLE_CONFIGURATION,
  },
  startRedirectPath: '/login/google',
  callbackUri: `${BASE_URL}login/google/callback`,
});
