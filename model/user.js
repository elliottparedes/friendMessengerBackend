const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema ({
    username: {
        type:String,
        required:true
    },
    password: {
        type: String, 
        required: false
    }
}, {timestamps:true});

const User = mongoose.model("User", userSchema);

module.exports = User;