const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const messageModel = mongoose.model("messageModel", messageSchema);
module.exports = messageModel;
