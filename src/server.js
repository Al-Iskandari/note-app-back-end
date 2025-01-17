const Hapi = require('@hapi/hapi');
const routes = require('./routes');


// Start the server, bind to the specified port and host.
const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    'routes': {
      'cors': {
        'origin': ['*'],
        'headers': [
          'Authorization',
          'Content-Type',
        ],
      }
    }
  });

  server.route(routes);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();