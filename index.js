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

// https://friendmessenger.netlify.app
// http://localhost:3000
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
     });


var messageRoutes = require("./routes/messageRoutes");
app.use(messageRoutes);

var userRoutes = require("./routes/userRoutes");
app.use(userRoutes);

var conversationRoutes = require("./routes/conversationRoutes");
app.use(conversationRoutes);


