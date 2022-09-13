const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const User = require("../../schemas/user");




async function auth(req, res, next) {
    
    // récuperation de l'email et du mot de passe dans le body
    let password = req.body["password"];
    let email = req.body["email"];

    // verification de la présence de l'email et du mot de passe dans le body de la requete
    if (!password)
        return next(createError(400, "password is a required property"));
    if (!email)
        return next(createError(400, "email is a required property"));

    try {

        // Recherche de l'utilisteur par son email en bdd
        let user = await User.findOne( { email: req.body["email"].toLowerCase() } )

        // Retour d'une erreur 400 si le user n'existe pas
        if (!user)
            return next(createError(400, "Invalid credentials"));

        // comparaison du mot de passe du user (deja crypté en bdd) et du mot de passe du body que l'ont crypte dans la fonction "compare"
        const valid = await bcrypt.compare(password, user.password);

        // Retour d'une erreur 400 si le mot de passe est faux
        if (!valid)
            return next(createError(400, "Invalid credentials"));

        // generation du token
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
        return next(createError(500, e.message));
    }
    
}


module.exports = auth;