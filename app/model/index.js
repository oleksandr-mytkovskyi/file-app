const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = process.env.URL_DB;
db.files = require('./file.model.js');

module.exports = db;