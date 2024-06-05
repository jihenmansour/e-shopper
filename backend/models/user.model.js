const mongoose = require('mongoose');
const { isEmail } = require('validator');

// Address sub-schema
const addressSchema = new mongoose.Schema({
    address: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    zip: {
        type: String
    },
    country: {
        type: String
    }
}, { _id: false });

// User schema
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Full name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: [isEmail, "Email is not valid"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Minimum password length is 6 characters"]
    },
    address: {
        type: [addressSchema],
        default: []
    },
    role: {
        type: String,
        required: [true, "role is required"],
        enum: ['administrator', 'responsible', 'client']
    },
    phone: {
        type: String
    },
    image: {
        type: String
    }
},
    {
        timestamps: true,
    }
);


const User = mongoose.model('User', userSchema);

module.exports = User;
