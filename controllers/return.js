if (process.env.NODE_ENV !== "production") {
    require('dotenv').config(); // Load environment variables from .env file in development mode
}
const AppError = require('../utils/AppError');
const axios = require('axios');
const calculateDailyReturn = require('../utils/calculateDailyReturn');
const token = process.env.IEX_TOKEN; // Retrieve IEX token from environment variables

module.exports.getReturn = async (req, res, next) => {
    const { symbol, from, to } = req.query;

    // Check if from and to dates are provided
    const url = from
        ? `https://cloud.iexapis.com/stable/stock/${symbol}/chart/max?token=${token}`
        : `https://cloud.iexapis.com/stable/stock/${symbol}/chart/ytd?token=${token}`;

    // Fetch historical prices from IEX API
    let response = await axios.get(url);

    let newFrom = -1; // Initialize the variable to store the new starting date

    // Filter Data to get the new starting date
    response.data.filter((daydata, index) => {
        const date = new Date(daydata.date);

        if (response.data[index - 1] && date >= new Date(from) && newFrom === -1) {
            newFrom = response.data[index - 1].date; // Save the date if it meets the condition and newFrom is not already set
        }
    });

    // Filter Data based on date range
    const filteredDayData = response.data.filter((daydata) => {
        const date = new Date(daydata.date);
        return (!from || date >= new Date(newFrom)) && (!to || date <= new Date(to));
    });

    // Calculate Returns
    const returns = [];
    for (let i = 1; i < filteredDayData.length; i++) {
        const dailyReturn = calculateDailyReturn(filteredDayData[i].close, filteredDayData[i-1].close); // Calculate daily returns

        // Pushes an object into the 'returns' array containing the date, daily return, and daily return in percentage.
        returns.push({ date: filteredDayData[i].priceDate, 'return': dailyReturn, 'return in percent': (dailyReturn * 100).toFixed(3) });
    }

    if (returns.length !== 0) {
        res.status(200).json({ returns }); // Respond with daily returns

    } else {
        console.log(`Response sent with bodyaa:`);
        return next(new AppError('No stock data available for the specified date range', 404)); // Handle no data available
    }
};