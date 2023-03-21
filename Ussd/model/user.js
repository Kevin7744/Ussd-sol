const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    name: String,
    id: String,
    phoneNumber: String,
    sessionId: String
})

const User = mongoose.model('User', UserSchema);
module.exports = User;
