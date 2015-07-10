var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: String,
  name: String,
  admin: Boolean,
  root: Boolean,
  lastName: String,
  birthDay: Date,
  location: String,
  created_at: Date
});

var user = mongoose.model('user', userSchema);

module.exports = user;