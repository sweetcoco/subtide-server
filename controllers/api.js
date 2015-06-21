var Config = require('../config');
var Joi = require('joi');
var User = require('../models/user').User;
var Channel = require('../models/channel').Channel;




/**
 * Handles a call to /api/users/{userId} and returns the user
 */
exports.getUser = {
	auth: 'session',
	handler: function (request, reply) {
		var userId = encodeURIComponent(request.params.userId);

		User.findOne({'_id': userId}, function (err, user) {
				if (err) {
					reply(err);
					return;
				}
				reply({user:user});
			});

		// User.findOne({'_id': userId}) // populate example
		// .populate('channels')
		// .exec( function(err, user) {
		// 	if (err) {
		// 		return reply(err);
		// 	}
		// 	reply({user:user});
		// });
  	}
};

/**
 * Handles a call to /api/users/{userId} and updates the user
 */
exports.updateUser = {
	auth: 'session',
	handler: function (request, reply) {
		console.log(request.payload);
		User.findByIdAndUpdate(request.params.userId, request.payload, function (err, user) {
			if (err) return reply(err);
			console.log(request.params.userId);
			return reply({user:user});
		});
  	}
};


/**
 * Handles a call to /api/channels/{channel_ids?} and returns the user's channels - or if no id's are passed, returns all channels
 */
exports.getChannels = {
	auth: 'session',
	handler: function (request, reply) {
		var userId = encodeURIComponent(request.params.userId);
		console.log(request.query.ids);

		if (request.query.ids) {

			Channel.find({'_id': { $in: request.query.ids}}, function (err, channels) {
				if (err) {
					reply(err);
					return;
				}

				reply({channels:channels});
			});
		} else {
			Channel.find(function (err, channels) {
				if (err) {
					reply(err);
					return;
				}
				reply({channels:channels});
			});
		}
  	}
};

/**
 * Handles a call to /api/channels and saves the channel to db, returns the updated user and the new group.
 */
exports.createChannel = {
	auth: 'session',
	validate: {
		payload: {
            channelName: Joi.string().required(),
			channelCreator: Joi.string().allow(null),
			channelMembers: Joi.array().allow(null)
        }
	},
	handler: function (request, reply) {

		var newChannel = new Channel({
			channelName: request.payload.channelName,
			channelCreator: request.auth.credentials._id,
			channelMembers: [request.auth.credentials._id]
		});

		newChannel.save(function (err) {
			if (err) {
				reply(err);
				return;
			}

			User.findByIdAndUpdate(request.auth.credentials._id, { $push: { channels: newChannel._id }}, function (err, user) {
			    if (err) return reply(err);

				reply({user:user, channel:newChannel});
			});
		});
  }
};

/**
 * Handles a call to /api/channels and returns the user's channels
 */
exports.getAllChannels = {
	auth: 'session',
	handler: function (request, reply) {

		Channel.find(function (err, channels) {
			if (err) {
				reply(err);
				return;
			}
			reply({channels:channels});
		});
  	}
};
