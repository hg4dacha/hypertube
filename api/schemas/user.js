const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
    omniauthId: { type: String, default: null },
    lastname: String,
    firstname: String,
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    image: String,
    password: { type: String, unique: false, default: null },
    language: { type: String, default: "en" },
    tokenPassword:  { type: String, default: null },
    moviesViewed: Array
});


const User = mongoose.model("User", usersSchema);
module.exports = User;