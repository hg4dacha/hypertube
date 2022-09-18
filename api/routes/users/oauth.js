const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const User = require("../../schemas/user");




async function oauth(req, res, next) {

    let omniauthId = req.body["omniauthId"];
    let accessKey = req.body["accessKey"];

    if (!omniauthId)
        return next(createError(400, "Invalid credentials"));
    if (!accessKey)
        return next(createError(400, "Invalid credentials"));

    try {

        let user = await User.findOne( { omniauthId: omniauthId } )

        if (!user) return next(createError(400, "Invalid credentials"));

        const checkAccessKeyValidity = await bcrypt.compare(process.env.ACCESS_KEY, accessKey);

        if (!checkAccessKeyValidity) return next(createError(400, "Invalid credentials"));

        // token generation
        let token = await jwt.sign({
            id: user.id,
            email: user.email,
            id_group_right_mams: user.id_group_right_mams
        }, process.env.JWT_SECRET, { expiresIn: "24h" });

        // generate cookie key for acces to some request
        const getAccessKey = await bcrypt.hash(process.env.ACCESS_KEY, 10);

        // reponse du la requete
        return res.status(200).json({
            response: "ok",
            data: {
                id: user._id,
                lastname: user.lastname,
                firstname: user.firstname,
                username: user.username,
                email: user.email,
                image: user.image,
                language: user.language,
                token
            },
            accessKey: getAccessKey
        });
    } catch (e) {
        console.error(e);
        return next(createError(400, e.message));
    }
    
}


module.exports = oauth;