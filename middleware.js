const AppError = require('./utils/AppError');

// Middleware to validate user input
module.exports.userInputValidator = (req, res, next) => {
    const { symbol, from, to } = req.query;
    let errorMsg = '';

    function isValidDateFormat(dateString) {
        return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
    }

    if (!symbol) {
        errorMsg += 'Stock symbol is required, ' // Ensure stock symbol is provided
    }

    if (from && to) {
        const fromDate = new Date(from);
        const toDate = new Date(to);

        // Check if the date strings were valid (YYYY-MM-DD)
        if (!isValidDateFormat(from) || !isValidDateFormat(to) ||
            isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
            errorMsg += 'Invalid date format! use (YYYY-MM-DD), '; // Handle invalid date format
        }

        if (fromDate > toDate) {
            errorMsg += 'Invalid date range: from date must be before to date, ' // Ensure from date is before to date
        }

        // Check if the difference between from and to dates is more than 30 days
        const differenceInTime = toDate.getTime() - fromDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convert difference to days
        if (differenceInDays > 30) {
            errorMsg += 'Date range exceeds 30 days, ' // Limit date range to 30 days
        }

        // Check if the dates are in the future
        if (fromDate > new Date() || toDate > new Date()) {
            errorMsg += 'Dates cannot be in the future, ' // Prevent future dates
        }
    }

    if (errorMsg !== '') {
        throw new AppError(errorMsg, 400); // throw All Errors
    }

    return next();
};