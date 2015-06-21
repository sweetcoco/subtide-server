var Joi = require('joi');
var User = require('../models/user').User;

/**
 * Responds to POST /login and logs the user in, well, soon.
 */
exports.login = {
	validate: {
        payload: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },
	handler: function (request, reply) {

		//verify password
		User.authenticate()(request.payload.email, request.payload.password, function (err, user, message) {

			// There has been an error, do something with it.
			if (err) {
				console.error(err);
				return reply.redirect('/');
			}

			// If the authentication failed user will be false. If it's not false, we store the user
			// in our session and redirect the user to the dashboard
			if (user) {
				request.auth.session.set(user);
				return reply.redirect('/');
			}
			return reply(message);

		});
    }
};

/**
 * Responds to GET /logout and logs out the user
 */
exports.logout = {
	auth: 'session',
	handler: function (request, reply) {

		if (request.auth.isAuthenticated) {
			request.auth.session.clear();
			reply().redirect('/');
		} else {
			reply().redirect('/');
		}
	}
};

/**
 * Responds to POST /register and creates a new user.
 */
exports.register = {
	validate: {
		payload: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
			firstName: Joi.string().required(),
			lastName: Joi.string().required(),
			username: Joi.string().required(),
        }
	},
	handler: function(request, reply) {

		// Create a new user
		var newUser = new User({
			email: request.payload.email,
			firstName: request.payload.firstName,
			lastName: request.payload.lastName,
			username: request.payload.username,
		});

		// The register function has been added by passport-local-mongoose and takes as first parameter
		// the user object, as second the password it has to hash and finally a callback with user info.
		User.register(newUser, request.payload.password, function(err, user) {
			// Return error if present
			if (err) {
                return reply(err);
            }

            reply().redirect('/');
        });
	}
};
