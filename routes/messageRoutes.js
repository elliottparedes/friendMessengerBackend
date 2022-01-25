const express = require('express');
const mongoose = require('mongoose');
const Message =require('../model/message');
var bodyParser = require('body-parser')
const route = express();

const auth = require('../auth');
const verifyToken = auth.verifyToken;
const ensureToken = auth.ensureToken;


// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
-


route.post('/sendMessage', jsonParser, ensureToken, verifyToken , (req,res) => {
    console.log(req.body.message);
    const message = new Message({
        body:req.body.message,
        sender:req.body.sender,
        receiver: req.body.receiver
    });

    message.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => 
        console.log(err));
})

 route.post('/getMessages',ensureToken,verifyToken,jsonParser, async(req,res) => {

    let responseArray = [];
    try{

            await Message.find({ sender:req.body.sender}, (err,docs)=>{
          
            responseArray = docs;
            console.log(responseArray);
            console.log("There was an error: " + err);
            
            }).clone();
    if(responseArray.length==0)
        res.send({"Error":"You have made this query too many times in succession. Please wait"})        
    else res.send(responseArray);
    }catch (err) {
        console.log('error', err)
        res.status(500).json({error:'There was a Server Side Error!'})
    }

})


module.exports = route;