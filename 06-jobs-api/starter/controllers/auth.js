const { StatusCodes } = require('http-status-codes');
const Users_DB = require('../models/User');
const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors');
const bycrypt = require('bcryptjs');

const SECRET = process.env.JWT_SECRET;

const api_response = (id,name,email,token) => {
    return {id: id, name: name, email: email, token: token}
} 

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new BadRequestError('Please add all the values in request.')
    }
    const salt = await bycrypt.genSalt(10);
    const hash = await bycrypt.hash(password,salt);

    const tempUser = { name, email, password: hash }

    const USER = await Users_DB.create(tempUser);
    const token = jwt.sign({ email, name }, SECRET, { expiresIn: '3600s' });

    await res.status(StatusCodes.CREATED).json( api_response(USER.id, USER.name, USER.email, token) );
}

const login = async (req, res) => {
    await res.status(StatusCodes.CREATED).json(req.body);
}

module.exports = { register, login };