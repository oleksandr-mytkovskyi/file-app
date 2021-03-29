const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    name: String,
    url: String,
    tier: String,
    size: Number,
    createdOn: String,
    lastModified: String
  })
  
  const File = mongoose.model('file', fileSchema);
  
  module.exports = File;