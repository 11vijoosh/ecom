const express = require('express');
const router = express.Router();
const Product = require('../models/products');

const mongoose = require('mongoose');
const db = "mongodb+srv://brad123:brad123@mycluster-1tapw.mongodb.net/ecom?retryWrites=true&w=majority";

mongoose.connect(db, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) {
        console.error('Error!' + err);
    } else {
        console.log('connected to mongodb');
    }
})

router.get('/', (req, res) => {
    res.send("from products route")
});

router.get('/products', (req, res) => {
    Product.find((err, Products) => {
        if(err){
            console.log("error");
        } else {
            res.json(Products);
        }
    });
});

router.get('/products/:cat', (req, res) => {
    var cat=req.params.cat;
    Product.find({'category':cat}, (err, Products) => {
        if(err){
            console.log("error");
        } else {
            res.json(Products);
        }
    });
});


router.post('/addproduct', (req, res) => {
    let productData = req.body;
    let product = new Product(productData);
    product.save((error, registeredProduct) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).send(registeredProduct);
        }
    });
});



module.exports = router;