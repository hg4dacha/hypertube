const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
require("colors");
const User = require("../../schemas/user");
const checkUserDataService = require("../../services/checkUserData");
const sanitize = require("mongo-sanitize");




async function checkUserFields(data) {

    try {
        let error;
        if ((error = checkUserDataService.lastname(data.lastname))) return error;
        if ((error = checkUserDataService.firstname(data.firstname))) return error;
        if ((error = await checkUserDataService.username(data.username))) return error;
        if ((error = await checkUserDataService.email(data.email))) return error;
        if ((error = checkUserDataService.password(data.password))) return error;
        
        return null;
    }
    catch(error) {
        console.log(error);
    }
}


async function addUser(req, res, next) {

    let error = await checkUserFields(req.body);
    if (error) {
        return next(createError(400, error));
    }

    try {
        
        // var lang = req.session.language;
        // console.log(lang);
    
        // const uniqid = new Date().getTime() + Math.floor(Math.random() * 10000 + 1).toString(16);
        let password;
        bcrypt.hash(req.body.password, 10, async (err, hash) => {

            if (err) return next(createError(500, err));

            password = hash;

            const user = new User({
                lastname: sanitize(req.body.lastname.toLowerCase()),
                firstname: sanitize(req.body.firstname.toLowerCase()),
                username: sanitize(req.body.username.toLowerCase()),
                email: sanitize(req.body.email.toLowerCase()),
                password,
                image: `https://avatars.dicebear.com/api/initials/${req.body.firstname}-${req.body.lastname}.svg`
            });
    
            await user.save();
            // user.save();
            return res.status(201).json({ status: "success" });

        });
    
        
    } catch (e) {
        return next(createError(500, e.message));
    }
    
}


module.exports = addUser;