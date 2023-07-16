const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

const connectDB = (url) => {
    console.log('Connected to DB...')
    return mongoose.connect(url);
}

module.exports = connectDB;