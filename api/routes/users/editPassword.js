const User = require("../../schemas/user");
const createError = require("http-errors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const checkUserDataService = require("../../services/checkUserData");





async function editPassword(req, res, next) {

    try {
        
        if (req.body.newPassword && req.body.userId && req.body.tokenPassword) {

            const newPassword = req.body.newPassword;
            const userId = mongoose.Types.ObjectId(req.body.userId);
            const tokenPassword = req.body.tokenPassword;

            const result = await User.findOne({ _id: userId });

            if(result) {

                if (tokenPassword === result.tokenPassword) {

                    let error;
                    if (error = checkUserDataService.password(newPassword)) {
                        return next(createError(400, error));
                    }
                    else {

                        const _id = mongoose.Types.ObjectId(result._id);

                        const newPasswordHached = await bcrypt.hash(newPassword, 10);
                        const newTokenPassword = Math.round(Math.random() * 10000) + Math.random().toString(36).substr(2) + Math.round(Math.random() * 10000000) + Math.random().toString(36).substr(2) + Math.round(Math.random() * 100);

                        await User.findOneAndUpdate({ _id: _id }, {password: newPasswordHached, tokenPassword: newTokenPassword});

                        return res.status(200).json({});
                    }
                }
                else {
                    return next(createError(400, 'INVALID_REQUEST'));
                }
            }
            else {
                return next(createError(400, 'INVALID_REQUEST'));
            }

        } else {
            return next(createError(400, 'INVALID_REQUEST'));
        }

    } catch (e) {
        return next(createError(400, e.message));
    }

}

module.exports = editPassword;