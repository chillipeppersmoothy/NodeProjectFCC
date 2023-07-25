const { StatusCodes } = require('http-status-codes');
const Users_DB = require('../models/User');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const api_response = (id,name,email,token) => {
    return {user: {id: id, name: name, email: email}, token: token}
} 

const register = async (req, res) => {

    const USER = await Users_DB.create(req.body);

    const token = jwt.sign({ userId: USER._id, email: USER.email }, SECRET, { expiresIn: '3600s' });

    await res.status(StatusCodes.CREATED).json( api_response(USER.id, USER.name, USER.email, token) );
}

const login = async (req, res) => {
    await res.status(StatusCodes.CREATED).json(req.body);
}

module.exports = { register, login };