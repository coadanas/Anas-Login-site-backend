const express = require("express");
const app = express();
const registerRouter = express.Router();
const User = require("../userModel/userModel.js");

registerRouter.route("/register").get(getRegister).post(postRegister);

async function getRegister(req, res) {
    try {
        let users = await User.find(req.query);
        console.log(users);
        res.json({ message: "Users data", data: users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function postRegister(req, res) {
    let { name, email, password } = req.body;

    // Check if any field is empty
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
        console.log("User already exists:", userExist);
        return res.status(400).json({ message: "User Already Exists" });
    }

    // Create a new user if the user doesn't exist
    try {
        const newUser = await User.create({ name, email, password });
        let userId = newUser._id.toString();

        res.json({
            message: "User registered successfully",
            userId: userId,
            token: await newUser.generateToken(), // Assuming generateToken is defined in your User model
            data: newUser
        });

        console.log("User data submitted:", newUser);
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

console.log("Register route: http://localhost:5000/auth/register");

module.exports = registerRouter;

// async function postRegister(req, res) {
//     let { name, email, password } = req.body;

//     const userExist = await User.findOne({ email });
//     if (userExist) {
//         console.log("User already exists:", userExist);
//         return res.status(400).json({ message: "User Already Exists" });
//     }

//     // Create a new user if the user doesn't exist
//     try {
//         const newUser = await User.create({ name, email, password });
//         let userId = newUser._id.toString();

//         res.json({
//             message: "User registered successfully",
//             userId: userId,
//             token: await newUser.generateToken(), // Assuming generateToken is defined in your User model
//             data: newUser
//         });

//         console.log("User data submitted:", newUser);
//     } catch (error) {
//         console.error("Error registering user:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// }