const express = require('express');
const mongoose = require('mongoose');

const Message =require('./model/message');
const User = require('./model/user');

require("dotenv").config();

const app = express();


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.j3fag.mongodb.net/messages?retryWrites=true&w=majority`; 
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology:true})
 .then((result) => {console.log('connected to db'); app.listen(process.env.PORT || 3000);})
 .catch((err) => console.log(err));

 app.set('view engine','ejs');



app.use(express.static('public'));




var messageRoutes = require("./routes/messageRoutes");
app.use(messageRoutes);

var userRoutes = require("./routes/userRoutes");
app.use(userRoutes);

