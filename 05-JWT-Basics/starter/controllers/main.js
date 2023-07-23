const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors/index');
const { StatusCodes } = require('http-status-codes');

const SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
    const { username, password } = req.body

    //validate if username and is null or empty
    if (!username || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    //create a unique id using date function
    const id = new Date().getTime();

    // create a jwt signature, jwt.sign(payload,secret)
    const token = jwt.sign({ id, username }, SECRET, { expiresIn: '3600s' })

    await res.status(StatusCodes.CREATED).json({ msg:"User Created",expiresIn: 3600, token: token });
}

const dashboard = async (req, res) => {
    console.log(req.user);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(StatusCodes.OK).json({ msg: `Hello, ${req.user.username}`, secret: `Here is your auth data ${luckyNumber}` });
}

module.exports = { login, dashboard }

