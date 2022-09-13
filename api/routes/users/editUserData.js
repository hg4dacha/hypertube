const createError = require("http-errors");
const bcrypt = require("bcrypt");
const User = require("../../schemas/user");
const checkUserDataService = require("../../services/checkUserData");
const sanitize = require("mongo-sanitize");
const mongoose = require("mongoose");
const avatars = require("./avatars");





async function editUserData(req, res, next) {

    try {

        let dataEdit = {}
        let error;

        if(req.body.image) {
            if(avatars.includes(req.body.image)) {
                dataEdit.image = req.body.image;
            }
            else {
                return next(createError(400, error));
            }
        } 

      	if (req.body.lastname) {
        	if ((error = checkUserDataService.lastname(req.body.lastname))) return next(createError(400, error));
            dataEdit.lastname = sanitize(req.body.lastname.toLowerCase());
        }
      
      	if (req.body.firstname) {
        	if ((error = checkUserDataService.firstname(req.body.firstname))) return next(createError(400, error));
            dataEdit.firstname = sanitize(req.body.firstname.toLowerCase());
        }
      
      	if (req.body.username) {
            if (req.body.username.toLowerCase() !== req.user.username.toLowerCase()) {
                if ((error = await checkUserDataService.username(req.body.username))) return next(createError(400, error));
                dataEdit.username = sanitize(req.body.username.toLowerCase());
            }
        }
      
      	if (req.body.email) {
            if (req.body.email.toLowerCase() !== req.user.email) {
        	    if ((error = await checkUserDataService.email(req.body.email))) return next(createError(400, error));
                dataEdit.email = sanitize(req.body.email.toLowerCase());
            }
        }

        if(req.body.password) {
          const valid = await bcrypt.compare(req.body.password.currentPassword, req.user.password);
          if (!valid)  return next(createError(400, "Invalid current password."));
          
          if ((error = checkUserDataService.password(req.body.password.password))) return next(createError(400, error));
          dataEdit.password = await bcrypt.hash(req.body.password.password, 10);
        }

        if(req.body.language) {
            let language;
            
            if (!["en", "fr", "de"].includes(req.body.language)) {
                language = "en";
            }
            else {
                language = req.body.language;
            }
            dataEdit.language = language;
        }
        

        // `doc` is the document _before_ `update` was applied
        
      
      	const idUser = mongoose.Types.ObjectId(req.user.id);
      	const userUpdated = await User.findOneAndUpdate({ _id: idUser }, dataEdit, {returnDocument: "after"});
        console.log("USER UPDATED", userUpdated);
        return res.status(200).json({
            response: "ok",
            data: {
                id: userUpdated._id,
                lastname: userUpdated.lastname,
                firstname: userUpdated.firstname,
                username: userUpdated.username,
                email: userUpdated.email,
                image: userUpdated.image,
                language: userUpdated.language
            }
        });    
    
        
    } catch (e) {
        return next(createError(500, e.message));
    }
    
}


module.exports = editUserData;