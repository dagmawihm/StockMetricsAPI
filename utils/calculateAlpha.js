 // Function to calculate Alpha
 module.exports = function calculateAlpha(stockReturns, benchmarkReturns, dates) {
    // Check if both arrays have equal length
    if (stockReturns.length !== benchmarkReturns.length) {
        return "Data mismatch: The stock and benchmark data don't match up. Please check if both have data for the same time period.";
    }

    // Calculate differences using map
    const alpha = stockReturns.map((currentValue, index) => {
         const result = currentValue - benchmarkReturns[index];
         const date = dates[index];
         return {
            result, 
            date
        };
    });



    // Returns an object containing the date and alpha value.
    return alpha;
}