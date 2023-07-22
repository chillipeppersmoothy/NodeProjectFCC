const CustomAPIError = require('../errors/custom-error');

const login  = async (req,res) => {
    const {username, password} = req.body

    if(!username || !password) {
        throw new CustomAPIError('Please provide email and password', 400);
    }
    await res.json({username: username, password: password});
}

const dashboard = async (req,res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    await res.status(200).json({msg: `Hello, user`, secret: `Here is your auth data ${luckyNumber}`});
}

module.exports = {login, dashboard}

