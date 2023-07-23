const { UnAuthenticatedError } = require('../errors/index');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
    //validate if auth is present in the header
    const authHeader = await req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnAuthenticatedError('No token provided');
    }

    //split the token
    const token = authHeader.split(' ')[1];

    try {
        //verify the sent JWT, if its valid send response
        const decoded = jwt.verify(token,SECRET);
        //set the id and username from decoded
        const { id,username } = decoded;
        //set req.user to those 2 values
        req.user = { id,username };

        next();

    } catch (err) {
        throw new UnAuthenticatedError('Not authorized to access this route');
    }
}

module.exports = authMiddleware;