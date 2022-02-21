const express = require('express');
const mongoose = require('mongoose');
const Conversation =require('../model/conversation');
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


route.post('/createConversation', jsonParser, ensureToken, verifyToken , (req,res) => {
    console.log(req.body.participants);
    const conversation = new Conversation({
        participants: req.body.participants        
    });

    conversation.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => 
        console.log(err));
})

module.exports = route;