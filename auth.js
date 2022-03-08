const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const route = express();
// ensuring can push from new computer
function ensureToken(req,res,next){

    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader != 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

function verifyToken(req,res,next){
    jwt.verify(req.token,process.env.SECRET, function(err,data){
        if(err){
            res.sendStatus(403);
        }else{
            
            console.log("Token has been verified by auth verifyToken function!")
            next();
        }

    })
}


 module.exports = {
     ensureToken:ensureToken,
     verifyToken:verifyToken
 };