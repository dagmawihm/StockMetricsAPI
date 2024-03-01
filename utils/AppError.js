/**
 * Custom error class for Express apps.
 * 
 * Extends Error to provide custom error messages and HTTP status codes.
 */

class AppError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}
module.exports = AppError;