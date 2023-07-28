const Users_DB = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const SECRET = process.env.JWT_SECRET;

const auth = async (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication Invalid');
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token,SECRET);
        req.user = {userId: payload.userId, email: payload.userEmail};
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }

    
}

module.exports = auth;