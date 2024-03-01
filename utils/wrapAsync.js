const AppError = require('../utils/AppError');

//Wraps an asynchronous function to handle asynchronous errors.
module.exports = function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(error => next(new AppError(error.response ? error.response.data : 'An unexpected error occurred', error.response ? error.response.status : 500)))
    }
}

/* Wraps an asynchronous function to handle any potential errors that may occur during its execution. If an error occurs,
 it creates a new AppError instance with the error message and status code obtained from the error response, or defaults
 to a generic error message and status code 500. Then, it passes the error to the next middleware function in the
 middleware stack for error handling.*/