const User = require("../../schemas/user");
const createError = require("http-errors");





async function getAllUsers(req, res, next) {

    try {
        const users = await User.find({}, {lastname: 1, firstname: 1, username: 1, image: 1, _id: 0});
        return res.status(200).json({users});
    }
    catch(error) {
        return next(createError(500, e.message));
    }

}

module.exports = getAllUsers;