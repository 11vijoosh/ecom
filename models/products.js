const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const productsSchema = new Schema({
    productName: String,
    price: Number,
    description: String,
    category: String
});

module.exports = mongoose.model('product', productsSchema, 'products');