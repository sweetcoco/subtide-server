var Config = require('../config');
var Joi = require('joi');
var User = require('../models/user').User;
var Channel = require('../models/channel').Channel;
var ChannelInvite = require('../models/channel-invite').ChannelInvite;




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
		} else if (request.params.channel_ids) {
			Channel.findOne({'_id': request.params.channel_ids}, function (err, channels) {
				if (err) {
					return reply(err);
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
 * Handles a call to /api/channels and saves the channel to db, returns the updated user and the new channel.
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

/**
 * Handles a call to /api/createChannelInvite. creates channel-invite and updates the proper channel and invited user. returns channel invite and updated channel.
 */
exports.createChannelInvite = {
	auth: 'session',
	validate: {
		payload: {
			channel_id: Joi.string().required(),
			invitedEmail: Joi.string().required(),
			inviter: Joi.string().allow(null)
		}
	},
	handler: function (request, reply) {

		User.findOne({'email': request.payload.invitedEmail}, function (err, user) {
			if (err) {
				return reply(err);
			}
			//reply({user:user});

			var newChannelInvite = new ChannelInvite({
				channel_id: request.payload.channel_id,
				inviter: request.auth.credentials._id,
				invited: user
			});

			newChannelInvite.save(function (err) {
				if (err) {
					return reply(err);
				}
			});

			User.findByIdAndUpdate(user._id, { $push: { channelInvites: newChannelInvite._id }}, function (err, user) {
				if (err) {
					return reply(err);
				}
				//reply({user:user, channel:newChannel});

				Channel.findByIdAndUpdate(request.payload.channel_id, { $push: { userInvites: newChannelInvite._id}}, function (err, channel) {
					if (err) {
						return reply(err);
					}

					reply({channel:channel, channelInvite:newChannelInvite});
				});
			});
		});
	}
};


/**
 * Handles a call to /api/channelInvites/{channelInvite_ids?} and returns the user's channelInvites - or if no id's are passed, returns all channelInvites
 */
exports.getChannelInvites = {
	auth: 'session',
	handler: function (request, reply) {
		var userId = encodeURIComponent(request.params.userId);
		console.log(request.query.ids);

		if (request.query.ids) {

			ChannelInvite.find({'_id': { $in: request.query.ids}}, function (err, channelInvites) {
				if (err) {
					reply(err);
					return;
				}

				reply({channelInvites:channelInvites});
			});
		} else {
			ChannelInvite.findOne({'_id': request.params.channelInvite_ids}, function (err, channelInvites) {
				if (err) {
					return reply(err);
				}
				reply({channelInvites:channelInvites});
			});
		}
  	}
};
