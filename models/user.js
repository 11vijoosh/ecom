const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    name: String,
    password: { type: String, required: true },
    phone: Number,
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        pincode: { type: Number },
        country: { type: String }
    },
    cart: [
        {
            productName: String,
            price: Number,
            quantity: Number,
            totalPrice: Number,
            description: String,
            category: String
        }
    ],
    orders: [
        {
            productName: String,
            price: Number,
            quantity: Number,
            totalPrice: Number
        }
    ]
});

module.exports = mongoose.model('user', userSchema, 'users');