const User = require("../schemas/user");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const mongoose = require("mongoose");

async function checkToken(req, res, next) {
    
    const token = req.headers["x-access-token"];

    if (!token)
        return next(createError(401, "No authentication key given"));

    try {

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      	const idUser = mongoose.Types.ObjectId(decoded["id"]);
        const user = await User.findOne({ _id: idUser });
        if (!user)
            return next(createError(401, "Account doesn't exist"));

        req.user = user;

        return next();

    } catch (e) {
        console.log(e);
        return next(createError(401, e.message));
    }
}

module.exports = checkToken;