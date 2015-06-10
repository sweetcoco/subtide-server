var Static = require('./controllers/static');
var Pages = require('./controllers/pages');
var Authentication = require('./controllers/authentication');
//var Api = require('./controllers/api');

/**
 * Contains the list of all routes, i.e. methods, paths and the config functions
 * that take care of the actions - separated by pages/authentication/api
 */
exports.endpoints = [
	{ method: 'GET',    path: '/assets/{param*}',          						config: Static.assets   	    },
	{ method: 'GET',    path: '/',          							config: Pages.index   	    	},

	{ method: 'POST',   path: '/login',          								config: Authentication.login 	},
	{ method: 'GET',    path: '/logout',         								config: Authentication.logout 	},
	{ method: 'POST',   path: '/register',       								config: Authentication.register },

];
