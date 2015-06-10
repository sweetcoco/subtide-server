var Config = require('../config');
//var Race = require('../models/race').Race;

/**
 * Handles a call to / and shows some text with links to login and registration
 */
// exports.index = {
// 	auth: {
// 		mode: 'try',
// 		strategy: 'session'
// 	},
// 	handler: {
// 		directory: {
// 			path: './dist',
// 		}
// 	}
// };





/**
 * Handles a call to / and shows some text with links to login and registration
 */
exports.index = {
	auth: {
		mode: 'try',
		strategy: 'session'
	},
	handler: function (request, reply) {

		if (request.auth.isAuthenticated) {
			// The user is already logged in, redirect it to the dashboard
			reply.view('app', {
				id: request.auth.credentials._id,
				email: request.auth.credentials.email,
				baseUrl: Config.server.hostname + ':' + Config.server.port,
			});
		} else {
			reply.view('home');
		}
	}
};
