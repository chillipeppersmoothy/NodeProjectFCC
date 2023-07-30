const customAPIError = require('./customAPIError')
const notFoundError = require('./not-found');
const UnauthenticatedError = require('./unauthorized');
const BadRequestError = require('./bad-request');

module.exports = { customAPIError, notFoundError, UnauthenticatedError, BadRequestError }