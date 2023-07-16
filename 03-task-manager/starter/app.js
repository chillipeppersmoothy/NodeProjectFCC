const express = require('express');
const connectDB = require('./db/connect');
const tasks = require('./routes/tasks');
require('dotenv').config();

const app = express();
const DB_URL = process.env.MONGO_URI;
const PORT = 8080;

//middleware
app.use(express.json());
app.use(express.static('./public'));

//dbconnection
const startDB = async () => {
    try {
        await connectDB(DB_URL);
        Listen();
    } catch(err) {
        console.log(err);
    }
}
    
//routes
app.use('/api/v1/tasks', tasks);

//start dbconnection
startDB();

//listening on port
const Listen = () => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    })
}