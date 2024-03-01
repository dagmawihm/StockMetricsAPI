const express = require('express');
const returnRoute = require('./routes/return');
const returnAlpha = require('./routes/alpha');
const app = express();

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Get Return Route
app.use('/api/return', returnRoute);


// Get Alpha Route
app.use('/api/alpha', returnAlpha);

// Error handler route
app.use((err, req, res, next) => {
    const { status = 500, message = 'Something Went Wrong' } = err;
    res.status(status).json({ error: message })
});

// Define a 404 route handler
app.use((req, res) => {
    res.status(404).json({ error: '404 Not found' }); // Handle unknown routes
});

// Start the server
app.listen(3000, () => {
    console.log('Serving on port 3000.');
});
