import * as rp from 'request-promise-native';

 export async function request (uri: string, options = {}) {
  options = Object.assign(
    {
      uri,
      json: true,
      rejectUnauthorized: false,
      headers: {
        'Cache-Control': 'no-cache',
      },
      timeout: 5000,
    },
    options
  );

  return await rp(options);
};