var Mongoose = require('../database').Mongoose;
var Channel = require('../models/channel').Channel;


//create the schema
var userSchema = new Mongoose.Schema({
	email: 	      { type: String,	required: true },
	password:     { type: String,	required: true },
	firstName:    { type: String,	required: true },
	lastName:     { type: String,	required: true },
	username:     { type: String,	required: true },
	channels:    [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Channel'}],
	creationDate: { type: Date,		required: true, default: Date.now },
	channelInvites: [Mongoose.Schema.Types.ObjectId],
});

userSchema.plugin(require('passport-local-mongoose'), { usernameField: 'email', hashField: 'password', usernameLowerCase: true });

//create the model and add it to the exports
var User = exports.User = Mongoose.model('User', userSchema, 'Users');
