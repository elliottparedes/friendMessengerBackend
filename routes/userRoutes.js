const express = require('express');
const mongoose = require('mongoose');
const User =require('../model/user');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const route = express();
//authorization 
const auth = require('../auth');
const verifyToken = auth.verifyToken;
const ensureToken = auth.ensureToken;

//Bcrypt
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


route.get('/protected',ensureToken, verifyToken, function(req,res){

    console.log("yay you made it through the protected route");

})

route.post('/login', jsonParser, async function(req,res){
    // auth user 
    try{
            await User.find({username: req.body.username}, (err, docs) =>{
                if(docs.length!=0)
                {
                        console.log(docs);
                        const user = {username:req.body.username};
                        const token = jwt.sign({user},process.env.SECRET, {expiresIn: "1h"} );
                        res.json({token:token});
                } else { 
                    console.log("Could not find username");
                    res.json({Message:"Could not find username in Database"});
                }
            }).clone();
    }catch (err) {
        console.log('error', err)
        res.status(500).json({error:'There was a Server Side Error!'})

    }




})


route.post('/addUser', jsonParser , (req,res) => {
    
    
    console.log("new user added:" + req.body.username);

    
    
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
       
        const user = new User({
        username:req.body.username,
        password:hash
        
    });

    user.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => 
        console.log(err));



      });
    

})

route.get('/user',ensureToken,verifyToken, jsonParser, async function(req,res)
{
    try{
        await User.findOne({username: req.body.username}, (err,docs)=>{
            res.send(docs);
        }).clone();
    }catch(err) {
        res.send({Message:"something went wrong" + err})
    }

})



module.exports = route;