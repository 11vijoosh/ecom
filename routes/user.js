const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');

const mongoose = require('mongoose');
const db = "mongodb+srv://brad123:brad123@mycluster-1tapw.mongodb.net/ecom?retryWrites=true&w=majority";

mongoose.connect(db, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) {
        console.error('Error!' + err);
    } else {
        console.log('connected to mongodb');
    }
})

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token= req.headers.authorization.split(' ')[1]
    if(token==='null') {
        return res.status(401).send('Unauthorized request')
    }

    let payload= jwt.verify(token, 'secretKey')
    if(!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.get('/', (req, res) => {
    res.send("from user route")
});

router.get('/cart/:id', verifyToken, (req, res)=>{
    let id=req.params.id;
    User.find({'_id':id}, (err, data) => {
        if(err){
            console.log("error /cart/:id");
        } else {
           // console.log(data[0].cart)
           //console.log(data)
            res.json(data[0].cart);
        }
    });
})




router.put('/addtocart/:id',(req,res) =>{
    User.updateOne( { _id : req.params.id },{ $push: { cart: req.body } }, (err,data)=>{
        if(err)
        {
            console.log(err)
        } else {
            res.status(200).send(data);
        }
    });
})

router.delete('/removefromcart/:id/:itemid', (req,res)=>{
    // console.log(req.params.id)
    // console.log(req.params.itemid)
    User.updateOne( { _id : req.params.id }, {$pull: { cart: {_id:req.params.itemid} }}, (err,result)=>{
        if(err)
        {
            console.log(err)
        } else {
            console.log('deletedddd')
            res.status(200).send(result);
        }
    });
})



router.get('/orders/:id', verifyToken, (req, res)=>{
    let id=req.params.id;
    User.find({'_id':id}, (err, data) => {
        if(err){
            console.log("error /cart/:id");
        } else {
           // console.log(data[0].cart)
            res.json(data[0].orders);
        }
    });
})
router.put('/addtoorders/:id',(req,res) =>{
    User.updateOne( { _id : req.params.id },{ $push: { orders: req.body } }, (err,data)=>{
        if(err)
        {
            console.log(err)
        } else {
            res.status(200).send(data);
        }
    });
})

router.post('/register', (req, res) => {
    var hashedPassword = bcrypt.hashSync(req.body.password, 7);
    req.body.password = hashedPassword;
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error);
        } else {
            let id=registeredUser._id
            let payload = { subject: registeredUser._id };
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token,id});
            //res.status(200).send(registeredUser);
        }
    });
});


router.post('/login', (req, res) => {
    let userData = req.body;

    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            if (!user) {
                res.status(401).send('Invalid email');
            } else {
                // if(user.password !== userData.password) {
                //     res.status(401).send('Inavild Password');
                // } else {
                //     res.status(200).send(user);
                // }

                bcrypt.compare(userData.password, user.password, (err, result) => {
                    if (err) {
                        console.log("err in password compare", err);
                    }
                    else if (result == false) {
                        res.status(401).send('Invalid password');
                    }
                    else {
                        //res.status(200).send(user);
                        let id=user._id;
                        let payload = { subject: user._id };
                        let token = jwt.sign(payload, 'secretKey')
                        res.status(200).send({token,id});
                    }
                });

            }

        }
    });
});




module.exports = router;