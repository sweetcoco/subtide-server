var Hapi = require('hapi');
var Routes = require('./routes');
var Config = require('./config');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ port: Config.server.port });

server.views({
  engines: {
    hbs: require('handlebars')
  },
  path: './views',
  // layoutPath: './views/layout', // we no longer have
  // layout: 'default',            // a use for a default layout
  helpersPath: 'views/helpers',
  partialsPath: 'views/partials'
});

// Register the plugin
server.register(require('hapi-auth-cookie'), function (err) {
    if (err) {
        throw err;
    }

    // Set our strategy
    server.auth.strategy('session', 'cookie', {
        password: 'subtidepalaceofdoom', // cookie secret
        cookie: 'session', // Cookie name
        redirectTo: false, // Let's handle our own redirections
        isSecure: false, // required for non-https applications
        ttl: 24* 60 * 60 * 1000 // Set session to 1 day
    });
});

// Print some information about the incoming request for debugging purposes
server.ext('onRequest', function (request, reply) {
    console.log(request.path, request.query);
    return reply.continue();
});

server.route(Routes.endpoints);

// Start the server
server.start(function() {
    console.log("The server has started on port: " + server.info.port);
});
