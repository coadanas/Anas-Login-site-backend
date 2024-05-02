const express = require("express");
const userRouter = express.Router();
const User = require("../userModel/userModel.js");
const authMiddleware = require("../Middleware/authMiddleware.js");

userRouter.route("/user").get(authMiddleware, getUser);

async function getUser(req, res) {
    try {
        const data = req.user;
        console.log("login user data: ", data);
        return res.json({ data });
    } catch (err) {
        console.log(err);
    }
}

module.exports = userRouter;
