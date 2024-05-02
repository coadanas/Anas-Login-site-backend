const express = require("express");
const contactRouter = express.Router();
const messageModel = require("../userModel/contactModel.js");

contactRouter.route("/contact-us").post(postMessage);

async function postMessage(req, res) {
  try {
        const data = req.body;
        
        // Check if the message field is empty
        if (!data.message || data.message.trim() === "") {
            return res.status(400).json({ message: "Message field is required" });
        }
        
        const userData = await messageModel.create(data);
        console.log("your message", userData);
        res.json({
            message: "Your message",
            data: userData
        });}
    catch (err) {
        console.log("post message error: ", err);
        return res.json({
          message: "post message error",
          error: err
        })
    }
}

module.exports = contactRouter;
  
    // try {
    //     const data = req.body;
    //     const userData = await messageModel.create(data);
    //     console.log("your message", userData);
    //     res.json({
    //         message: "you message",
    //         data: userData
    //     });}