require('dotenv').config();  // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Import the CORS middleware
const habitRoutes = require("./routes/habits");

const app = express();

// Enable CORS for all requests
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// API routes
app.use("/api/habits", habitRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected successfully');
        app.listen(process.env.PORT || 5000, () => 
            console.log(`Server running on port ${process.env.PORT || 5000}`)
        );
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);  // Exit with failure
    });

// Handle uncaught errors globally (optional but recommended)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
