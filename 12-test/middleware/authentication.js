const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');
const SECRET = process.env.JWT_SECRET;

const authMiddleware = async(req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication Invalid');
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, SECRET);
        req.user = {userId: payload.userId, email: payload.userEmail};
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = authMiddleware;