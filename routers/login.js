const express = require("express");
const loginRouter = express.Router();
const User = require("../userModel/userModel.js");

loginRouter.route("/login").post(getLogin);

async function getLogin(req, res) {
    try {
        const { email, password } = req.body;
        
        // Find the user by email
        const userExist = await User.findOne({ email });
        if (!userExist) {
            console.log("User doesn't exist");
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the password provided by the user with the password in the database
        if (password !== userExist.password) {
            console.log("Invalid password");
            return res.status(401).json({ message: "Invalid password" });
        }

        // Assuming there's a method called generateToken in your userExistModel
        const token = await userExist.generateToken();
        const userid = userExist._id.toString();

        res.json({
            message: "User logged in successfully",
            userId: userid,
            token: token
        });
        
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

console.log("Login route: http://localhost:5000/auth/login");
module.exports = loginRouter;



// async function getLogin(req, res) {
//     try {
//         const { email, password } = req.body;
        
//         // Find the user by email
//         const userExist = await User.findOne({ email });
//         console.log(userExist);
//         if (!userExist) {
//             console.log("User doesn't exist");
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Assuming there's a method called generateToken in your userExistModel
//         const token = await userExist.generateToken();
//         const userid = await userExist._id.toString();

//         res.json({
//             message: "User logged in successfully",
//             userId: userid,
//             token: token
//         });
        
//     } catch (error) {
//         console.error("Error logging in:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// }