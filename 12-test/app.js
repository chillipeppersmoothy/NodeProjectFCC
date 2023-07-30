require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

//db connection
const connectDB = require('./db/connect');

//environment variables
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URI;

//routes
const authRoute = require('./routes/auth');
const jobsRoute = require('./routes/jobs');

//middleware
const notFoundMiddelware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authMiddleware = require('./middleware/authentication');

//app use
app.use(express.json());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/jobs', authMiddleware, jobsRoute);

app.use(notFoundMiddelware);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        connectDB(MONGO_URL);
        app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`) })
    } catch (error) {
        console.log(error);
    }
}

start();
