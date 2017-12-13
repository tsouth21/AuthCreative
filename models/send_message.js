var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var MessageSchema = new Schema({
    toUser: String,
    fromUser: String,
    url: String
});
mongoose.model('Message', MessageSchema);
