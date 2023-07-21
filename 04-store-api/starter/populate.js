require('dotenv').config();

const connectDB = require('./db/connect');
const products_DB = require('./models/product');

const jsonProducts = require('./products.json');
const MONGO_URL = process.env.MONGO_URI;

const start = async () => {
    try {
        await connectDB(MONGO_URL);
        await products_DB.deleteMany();
        await products_DB.create(jsonProducts);
    } catch (error) {
        console.log(error);
    }
}

start();