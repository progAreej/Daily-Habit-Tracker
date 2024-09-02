const jwt = require('jsonwebtoken');
const Register = require('../models/regist');  // Import the model

// Controller for registering a new user
exports.registerUser = async (req, res) => {
    try {
        const { name, password, habits } = req.body;

        // Create a new user with the provided data
        const newUser = new Register({
            name,
            password,
            habits: habits || 'No habit specified', // Use default value if habits is not provided
        });

        // Save the user to the database
        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send a success response
        res.status(201).json({
            message: 'User registered successfully',
            token,  // Send the token
            user: newUser,
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({
            message: 'Failed to register user',
            error: error.message,
        });
    }
};

// Controller for logging in a user
exports.loginUser = async (req, res) => {
    try {
        const { name, password } = req.body;

        // Find the user by name
        const user = await Register.findOne({ name });

        // Check if user exists
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send a success response
        res.json({
            message: 'Login successful',
            token,  // Send the token
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({
            message: 'Failed to log in',
            error: error.message,
        });
    }
};
