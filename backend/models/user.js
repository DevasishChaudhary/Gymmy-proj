const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["user", "admin", "trainer"],
        default: "user"
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },


}, 

{
    timestamps: true
}); // timestamps will add createdAt and updatedAt fields automatically

module.exports = mongoose.model("User", userSchema); // exporting the user model
