const mongoose = require("mongoose");
const JWT = require("jsonwebtoken")
require('dotenv').config();

const secretKey = "HELLOANASHOWAREYOU";
const db_url = "mongodb+srv://anas:anas@food.t6wubmw.mongodb.net/foodApp?retryWrites=true&w=majority&appName=food";

mongoose.connect(db_url)
  .then((db) => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
  
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
});

userSchema.methods.generateToken = async function(){
  return JWT.sign({
    userId: this._id.toString(),
    email: this.email,
    isAdmin: this.isAdmin
  },
 secretKey,
  {expiresIn: "30d"}
  )
}

const User = mongoose.model("User", userSchema);
module.exports = User;
