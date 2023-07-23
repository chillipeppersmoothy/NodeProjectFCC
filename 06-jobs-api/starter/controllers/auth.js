const { StatusCodes } = require('http-status-codes');
const Users_DB = require('../models/User');
const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors');
const SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new BadRequestError('Please add all the values in request.')
    }

    const ADD_USER = await Users_DB.create(req.body);
    const token = jwt.sign({ email, name }, SECRET, { expiresIn: '3600s' });
    await res.status(StatusCodes.CREATED).json({ msg: `user ${name} has been created successfully!`, token: token });
}

const login = async (req, res) => {
    await res.status(StatusCodes.CREATED).json(req.body);
}

module.exports = { register, login };