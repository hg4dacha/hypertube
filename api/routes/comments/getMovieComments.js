const createError = require("http-errors");
const Comment = require("../../schemas/comment");
const User = require("../../schemas/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");






async function getMovieComments(req, res, next) {

    try {

        if (req.cookies.accessKey) {

            const accessKey = req.cookies.accessKey;
            const checkAccessKeyValidity = await bcrypt.compare(process.env.ACCESS_KEY, accessKey);
            
            if (checkAccessKeyValidity) {

                if (req.params.id) {
        
                    const movieId = req.params.id;
        
                    const movieComments = await Comment.find({movieId: movieId});
                    
                    const results = [];

                    for (const [index, comment] of movieComments.entries()) {
        
                        const id = mongoose.Types.ObjectId(comment.userId);
        
                        const user = await User.findOne({_id: id}, {_id: 0, image: 1, username: 1});

                        if (user) {
                            const currentComment = {
                                id: movieComments[index]._id,
                                userId: movieComments[index].userId,
                                userImage: user.image,
                                username: user.username,
                                movieId: movieComments[index].movieId,
                                comment: movieComments[index].comment
                            }
            
                            results.push(currentComment);
                        }
        
                    }
                    if (results.length < 1) {
                        return res.status(200).json({
                            results: 0,
                            message: "No comments for this movie"
                        });
                    }
                    else {
                        return res.status(200).json(results);
                    }
                }
                else {
                    return next(createError(400, 'INVALID_REQUEST'));
                }
            }
            else {
                return res.status(400).json({
                    response: "ko",
                    message: "Access to resources not permitted"
                });
            }
        }
        else {
            return res.status(400).json({
                response: "ko",
                message: "Access to resources not permitted"
            });
        }

    }
    catch (e) {
        console.log(e.message);
        return next(createError(500, e.message));
    }

}

module.exports = getMovieComments;