const { StatusCodes } = require('http-status-codes');
const User_DB = require('../models/user');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req,res) => {
    const USER = await User_DB.create({ ...req.body });

    const token = await USER.createJWT();

    res.status(StatusCodes.CREATED).json({user: {name: USER.name, email: USER.email }, token: token});
}

const login = async (req,res) => {

    const { email, password } = req.body;
    if(!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    const USER = await User_DB.findOne({ email: email });

    if(!USER) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await USER.comparePassword(password);

    if(!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const token = await USER.createJWT();

    res.status(StatusCodes.OK).json({user: {name: USER.name, email: USER.email}, token: token});
}

module.exports = { login, register };