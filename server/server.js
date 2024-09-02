require('dotenv').config();  // Load environment variables at the top

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/register');  // Import the auth routes

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Use the auth routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI,
    //  { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        console.log('MongoDB connected');
        // Start the server
        app.listen(5000, () => console.log('Server running on port 5000'));
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);  // Exit the process with a failure code
    });
