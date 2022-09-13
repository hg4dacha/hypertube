const User = require("../schemas/user");

/**
 * Fonctions de verification des champs du user avant qu'il ne soit ajouté en base de données
 */

module.exports = {

    lastname: data => {console.log("LASTNAME_FUNCTION");
        const lastnamePattern = /^[a-zA-Z-]{1,30}$/;
        if (!lastnamePattern.test(data)) return "INVALID_LASTNAME";
        return null;
    },


    firstname: data => {console.log("FIRSTNAME_FUNCTION");
        const firstnamePattern = /^[a-zA-Z-]{1,30}$/;
        if (!firstnamePattern.test(data)) return "INVALID_FIRSTNAME";
        return null;
    },

    username: async data => {
    try {
        // Check pattern
        const usernamePattern = /^[a-zA-Z0-9-]{1,15}$/;
        if (!usernamePattern.test(data)) return "INVALID_USERNAME";
        // Check en bdd si le username existe
        const doesUserExist = await User.findOne({ username: data.toLowerCase() });
        if (doesUserExist) return "ALREADY_REGISTERED_USERNAME";
        return null;
        
    } catch (error) {
        console.log(error);
    }
    },

    email: async data => {console.log("EMAIL_FUNCTION");
        // Check pattern
        const mailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})){1,255}$/;
        if (!mailPattern.test(data)) return "INVALID_EMAIL";
        // Check en bdd si l'email existe
        const result = await User.findOne({ email: data.toLowerCase() });
        if (result) return "ALREADY_REGISTERED_EMAIL";
        return null;
    },

    password: data => {console.log("PASSWORD_FUNCTION");
        // Check pattern
        const pwdPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,255}$/;
        if (!pwdPattern.test(data)) return "INVALID_PASSWORD";
        return null;
    }
};