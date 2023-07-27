const { StatusCodes } = require('http-status-codes');
const Users_DB = require('../models/User');
const jwt = require('jsonwebtoken');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const api_response = (id, name, email, token) => {
    return { user: { id: id, name: name, email: email }, token: token }
}

const register = async (req, res) => {
    //create user in mongo db
    const USER = await Users_DB.create({ ...req.body });
    //call the createJWT token from schema
    const token = await USER.createJWT();

    await res.status(StatusCodes.CREATED).json(api_response(USER.id, USER.name, USER.email, token));
}

const login = async (req, res) => {
    // set request body to variables
    const { email, password } = req.body;
    // throw error if email or password is not provided
    if (!email || !password) {
        throw new BadRequestError('Please provide username and password');
    }
    // get back the info from mongo based on email
    const USER = await Users_DB.findOne({ email: email });
    // if user is not present in db throw error
    if (!USER) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    // generate jwt token from userSchema method
    const token = await USER.createJWT();
    await res.status(StatusCodes.OK).json({ user: { email: USER.email, name: USER.name }, token: token });
}

module.exports = { register, login };