const mongoose = require('mongoose');

const userSocialSchema = mongoose.Schema({
    id: Number,
    userId: Number,
    googleUserId: Number,
    facebookUserId: Number,
  })
  
  const UserSocial = mongoose.model('userSocial', userSocialSchema);
  
  module.exports = UserSocial;