var Config = require('../config');
//var Race = require('../models/race').Race;

/**
 * Handles a call to / and shows some text with links to login and registration
 */
exports.index = {
	auth: {
		mode: 'try',
		strategy: 'session'
	},
	handler: {
		directory: {
			path: '../subtide/dist'
		}
	}
};
