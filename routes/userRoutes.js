const express = require('express');
const mongoose = require('mongoose');

const User =require('../model/user');
var bodyParser = require('body-parser')



const route = express();

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })





route.post('/addUser', jsonParser , (req,res) => {
    console.log("new user added:" + req.body.username);
    const user = new User({
        username:req.body.username,
        password:req.body.password
        
    });

    user.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => 
        console.log(err));
})



module.exports = route;