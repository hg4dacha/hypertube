const User = require("../../schemas/user");
const createError = require("http-errors");
const sendMail = require("../../services/sendMail");





async function forgottenPassword(req, res, next) {

    try {
        
        if (req.body.email) {

            const email = req.body.email;

            // CHECK EMAIL EXISCTENCE
            const result = await User.findOne({ email: email.toLowerCase() });
            if (result) {
                
                const tokenPassword = Math.round(Math.random() * 10000) + Math.random().toString(36).substr(2) + Math.round(Math.random() * 10000000) + Math.random().toString(36).substr(2) + Math.round(Math.random() * 100);

                await User.findOneAndUpdate({ email: result.email }, {tokenPassword});

                const link = `http://localhost:3000/password-reset/${result._id}/${tokenPassword}`;

                await sendMail(result.email, link, result.language);

                return res.status(200).json({});
            }
            else {
                return res.status(200).json({});
            }

        } else {
            return next(createError(400, 'NO EMAIL'));
        }

    } catch (e) {
        return next(createError(400, e.message));
    }

}

module.exports = forgottenPassword;