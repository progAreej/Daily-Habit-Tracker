const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DropSchema = new Schema({
    title: {
        type: String,  // Changed 'string' to 'String'
        required: true,
    },
    description: {
        type: String,  // Changed 'string' to 'String'
        default: '',   // Default should be an appropriate string (change to something meaningful if needed)
    },
});

module.exports = mongoose.model('Hapit', DropSchema, "hapits");
