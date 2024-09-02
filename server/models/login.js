const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DropSchema = new Schema({
    name: {
        type: String,  // Corrected from `string` to `String`
        required: true,
    },
    password: {
        type: String,  // Corrected from `string` to `String`
        required: true, // Assuming you want the password to be required
    },
});

module.exports = mongoose.model('login', DropSchema, "login");
