const products_DB = require('../models/product')

const getAllProducts = async (req, res) => {
        //query params structure
        const { featured, rating, company, name } = req.query;
        const queryObject = {}
    
        if (featured) {
            queryObject.featured = featured === 'true' ? true : false;
        }
    
        if (rating) {
            queryObject.rating = rating;
        }
    
        if (company) {
            queryObject.company = company;
        }
    
        if (name) {
            queryObject.name = { $regex: name, $options: 'i'};
        }
        console.log(queryObject);

    const products = await products_DB.find(queryObject);
    await res.status(200).json({ items: products.length, products: products });
}

const getAllStaticProducts = async (req, res) => {


    const products = await products_DB.find().sort('-name');
    await res.status(200).json({ items: products.length, products: products });
}

module.exports = { getAllProducts, getAllStaticProducts }