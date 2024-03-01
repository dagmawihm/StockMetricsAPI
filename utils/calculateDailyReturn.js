// Function to calculate daily return
module.exports = function calculateDailyReturn(closingPrice, previousDayClosingPrice) {

    const dailyReturn = (closingPrice / previousDayClosingPrice) - 1; // Calculate daily returns
    return dailyReturn;
}