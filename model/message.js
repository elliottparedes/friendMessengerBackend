const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    body: {
        type: String,
        required:true
    },
    sender: {
        type: String, 
        required: true
    },
    receiver: {
        type:String, 
        required:true
    }
},{timestamps:true });


// Schema is what defines the structure of the documents that will be added to the database
// A model is what wraps around a schema and commmunicates with the database collection

const Message = mongoose.model("Message",messageSchema);

module.exports = Message;