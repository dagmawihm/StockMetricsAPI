const AppError = require('../utils/AppError');
const calculateAlpha = require('../utils/calculateAlpha');
const axios = require('axios');
module.exports.alpha = async (req, res, next) => {

    const { symbol, benchmark, from, to } = req.query;

    if (!benchmark) {
        return next(new AppError('Benchmark symbol is required', 400)); // Ensure benchmark symbol is provided
    }

    // Construct URLs for fetching historical stock data and benchmark data from the return API
    let urlStock = `http://localhost:3000/api/return?symbol=${symbol}`;
    let urlBenchmark = `http://localhost:3000/api/return?symbol=${benchmark}`;

    // Append from and to date parameter to the URLs if provided in the request query
    if (from) {
        urlStock += `&from=${from}`;
        urlBenchmark += `&from=${from}`;
    }
    if (to) {
        urlStock += `&to=${to}`;
        urlBenchmark += `&to=${to}`;
    }

    // Make internal requests to get returns for the stock and the benchmark
    const stockReturnsResponse = await axios.get(urlStock);
    const stockReturns = stockReturnsResponse.data.returns.map(item => item.return);
    const benchmarkReturnsResponse = await axios.get(urlBenchmark);
    const benchmarkReturns = benchmarkReturnsResponse.data.returns.map(item => item.return);

    // Extracts the dates from the API returns data.
    const dates = stockReturnsResponse.data.returns.map(item => item.date);

    // Calculate alpha value using stock and benchmark returns data
    let alpha = calculateAlpha(stockReturns, benchmarkReturns, dates);

    res.status(200).json({ alpha }); // Respond with alpha value
}