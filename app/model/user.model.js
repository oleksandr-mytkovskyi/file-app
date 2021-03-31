const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    // id: Number,
    name: String,
    email: String,
    password: { type: String, default: null },
    phone: { type: Number, default: null },
    picture: { type: String, default: null },
    socialAuth: {
      gUserId: { type: Number, default: null },
      fbUserId: { type: Number, default: null },
    },
    refreshToken: String
  })
  
  const User = mongoose.model('user', userSchema);
  
  module.exports = User;