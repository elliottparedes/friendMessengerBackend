const express = require('express');
const mongoose = require('mongoose');

const Message =require('../model/message');
var bodyParser = require('body-parser')




const route = express();

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })



route.get('/addMessage',(req,res) => {
    const message = new Message({
        body:"hello this is the first message",
        sender:"elliott",
        receiver: "emma"
    });

    message.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => 
        console.log(err));
})

route.post('/sendMessage', jsonParser , (req,res) => {
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

 route.get('/getMessages',jsonParser, async(req,res) => {

    let responseArray = [];
    try{

            await Message.find({ sender:req.body.sender, receiver: req.body.receiver}, (err,docs)=>{
          
            responseArray = docs;
            console.log(responseArray);
            
            }).clone();

    res.send(responseArray);
    }catch (err) {
        console.log('error', err)
        res.status(500).json({error:'There was a Server Side Error!'})
    }

})


module.exports = route;