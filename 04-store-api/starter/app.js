require('dotenv').config();
require('express-async-errors');
const express = require('express');
const errorHandlerMiddleware = require('../starter/middleware/error-handler');
const notFoundMiddleware = require('../starter/middleware/not-found');
const productsRouter = require('./routes/products');
const connectDB = require('./db/connect');

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URI;

//middleware
app.use(express.json());
app.use('/api/v1/products', productsRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

//DB connection
const start = async () => {
    try {
        await connectDB(MONGO_URL);
        //Port listening on port 8080
        app.listen(PORT, () => {console.log(`Listening on port ${PORT}...`)});
    } catch (error) {
        console.log(error);
    }
};

//calling DB connection
start();
