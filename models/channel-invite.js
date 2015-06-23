var Mongoose = require('../database').Mongoose;

//create the schema
var ChannelInviteSchema = new Mongoose.Schema({
  channel_id: Mongoose.Schema.Types.ObjectId,
  inviter: Mongoose.Schema.Types.ObjectId,
  invited: Mongoose.Schema.Types.ObjectId,
});



//create the model and add it to the exports
var ChannelInvite = exports.ChannelInvite = Mongoose.model('ChannelInvite', ChannelInviteSchema, 'ChannelInvites');
