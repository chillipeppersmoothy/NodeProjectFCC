const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        reqired: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            , 'Please provide valid email'
        ],
        unique: true
    },
    password: {
        type: String,
        reqired: [true, 'Please provide passsword'],
        minlength: 6,
        maxlength: 100
    }
});


userSchema.pre('save', async function() {
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
});

userSchema.methods.getName = async function() {
    return this.name;
}

userSchema.methods.getId = async function() {
    return this._id;
}

userSchema.methods.getEmail = async function() {
    return this.email;
}

userSchema.methods.createJWT = async function() {
    return jwt.sign({userId: this._id, userEmail: this.email}, SECRET, {expiresIn: '3600s'} );
    
}

module.exports = mongoose.model('Users_DB', userSchema);