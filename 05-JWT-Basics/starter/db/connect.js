const mongoose = require('mongoose');

const connectDB = (url) => {
  console.log('connected to mongo DB')
  return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = connectDB
