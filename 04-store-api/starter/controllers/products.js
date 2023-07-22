const products_DB = require('../models/product')

const getAllProducts = async (req, res) => {
        //query params structure
        const { featured, rating, company, name, sort, fields, numericFilters } = req.query;
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

        if(numericFilters) {
            // set symbols to letters
            const operatorMap = {
                '>': '$gt',
                '>=': '$gte',
                '=': '$eq',
                '<': '$lt',
                '<=': '$lte'
            }
            // add regex to find values
            const regEx = /\b(<|>|>=|<=|=)\b/g
            // replace symbols with mapped values
            let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
            // options for filters
            const options = ['price','rating'];

            filters = filters.split(',').forEach((item) => {
                const [field, operator, value] = item.split('-');
                if(options.includes(field)) {
                    queryObject[field] = { [operator]: Number(value) }
                }
            });
            console.log(queryObject)
        }

        let result = products_DB.find(queryObject);

        //sort
        if(sort) {
            const sortList = sort.split(',').join(' ');
            result = result.sort(sortList);
        } else {
            result = result.sort('createdAt');
        }

        //display fields
        if(fields) {
            const fieldList = fields.split(',').join(' ');
            //.select is used to display only those fields mentioned in it.
            result = result.select(fieldList);
        }

        //items limit and page
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page-1) * limit;

        result = result.limit(limit).skip(skip);

    const products = await result;
    await res.status(200).json({ items: products.length, products: products });
}

const getAllStaticProducts = async (req, res) => {

    const products = await products_DB.find({price: { $gt: 30 }}).sort('price').limit(10).select('name price');
    await res.status(200).json({ items: products.length, products: products });
}

module.exports = { getAllProducts, getAllStaticProducts }