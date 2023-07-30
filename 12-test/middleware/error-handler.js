const { StatusCodes } = require('http-status-codes');
const customAPIError = require('../errors/customAPIError');

const errorHandlerMiddleware = async (err, req, res, next) => {

    let customError = {
        msg: err.msg || 'Something went wrong',
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    }

    if(err instanceof customAPIError) {
        return res.status(err.statusCode).json(err.message)
    }

    if(err.name === 'CastError') {
        customError.msg = `No item found with id: ${err.value}`,
        customError.statusCode = 404
    }
    //return res.status(501).json(err);
    return res.status(customError.statusCode).json({msg: customError.msg});
}

module.exports = errorHandlerMiddleware;