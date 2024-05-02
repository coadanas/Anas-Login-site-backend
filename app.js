const express = require("express");
const app = express();
const JWT = require("jsonwebtoken");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// CORS CROS
const cors = require("cors");
var corsOptions = {
    origin: "https://anas-login-site.onrender.com",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const port = 5000;
require("dotenv").config();
app.use(bodyParser.json());

// USERMODEL && MONGOOSE CONNECTION
const User = require("./userModel/userModel.js");

// REGISTER ROUTE
const registerRouter = require("./routers/Register.js");
app.use("/auth", registerRouter);

// LOGIN ROUTE
const loginRouter = require("./routers/login.js");
app.use("/auth", loginRouter);

// USER ROUTE
const userRouter = require("./routers/user.js");
app.use("/auth", userRouter);

// USER ROUTE
const contactRouter = require("./routers/contactRouter.js");
app.use("/", contactRouter);

// SERVER LISTEN
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});
