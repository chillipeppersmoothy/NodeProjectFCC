const { StatusCodes } = require('http-status-codes');
const customAPIError = require('../errors/customAPIError');

class notFoundError extends customAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

module.exports = notFoundError;