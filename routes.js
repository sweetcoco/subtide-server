var Static = require('./controllers/static');
var Pages = require('./controllers/pages');
var Authentication = require('./controllers/authentication');
var Api = require('./controllers/api');

/**
 * Contains the list of all routes, i.e. methods, paths and the config functions
 * that take care of the actions - separated by pages/authentication/api
 */
exports.endpoints = [
	{ method: 'GET',    path: '/assets/{param*}',          						config: Static.assets   	    	},
	{ method: 'GET',    path: '/fonts/{param*}',          						config: Static.fonts 	  	    	},

	//{ method: 'GET',    path: '/{param*}',          							config: Pages.toApp   	    		},

	{ method: 'GET',    path: '/api/users/{userId}',							config: Api.getUser 				},
	{ method: 'PUT',    path: '/api/users/{userId}',							config: Api.updateUser 				},

	{ method: 'GET',   	path: '/api/channels/{channel_ids?}',					config: Api.getChannels				},
	//{ method: 'GET',   	path: '/api/channels/',									config: Api.getAllGroups	},
	{ method: 'POST',   path: '/api/channels',									config: Api.createChannel			},

	{ method: 'GET',   	path: '/api/channelInvites/{channelInvite_ids?}',		config: Api.getChannelInvites		},
	{ method: 'POST',   path: '/api/channelInvites',							config: Api.createChannelInvite		},

	{ method: 'POST',   path: '/login',          								config: Authentication.login 		},
	{ method: 'GET',    path: '/logout',         								config: Authentication.logout 		},
	{ method: 'POST',   path: '/register',       								config: Authentication.register 	},


	{ method: 'GET',    path: '/{param*}',          							config: Pages.index   	    		},

];
