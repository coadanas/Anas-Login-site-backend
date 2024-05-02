const express = require("express");
const JWT = require("jsonwebtoken");
const User = require("../userModel/userModel.js");

async function authMiddleware(req, res, next) {
    const token = req.header("Authorization");

    if (!token || !token.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ message: "Unauthorized HTTP, Token not provided" });
    }

    const jwtToken = token.replace("Bearer ", "").trim();

    try {
        const isVerified = JWT.verify(jwtToken, "HELLOANASHOWAREYOU");

        const userData = await User.findOne({ email: isVerified.email }).select(
            { password: 0 }
        );

        req.token = token;
        req.user = userData;
        req.userID = userData._id;

        console.log(token);
        next();
    } catch (err) {
        return res
            .status(401)
            .json({ message: "Unauthorized. Invalid token." });
    }
}

module.exports = authMiddleware;
