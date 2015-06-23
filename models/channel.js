var Mongoose = require('../database').Mongoose;

//create the schema
var ChannelSchema = new Mongoose.Schema({
  channelName: String,
  channelCreator: Mongoose.Schema.Types.ObjectId,
  channelMembers: [Mongoose.Schema.Types.ObjectId],
  userInvites: [Mongoose.Schema.Types.ObjectId],
});



//create the model and add it to the exports
var Channel = exports.Channel = Mongoose.model('Channel', ChannelSchema, 'Channels');
