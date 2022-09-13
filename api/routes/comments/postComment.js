const createError = require("http-errors");
const Comment = require("../../schemas/comment");
const sanitize = require("mongo-sanitize");




async function postComment(req, res, next) {

    try {

        if (req.body.movieId && req.body.comment) {

            const userId = req.user._id;
            const movieId = req.body.movieId;
            const comment = req.body.comment;

            if(comment !== '' && comment.length <= 1000) {

                const newComment = new Comment({
                    userId: sanitize(userId),
                    movieId: sanitize(movieId),
                    comment: sanitize(comment)
                });

                await newComment.save();
    
                return res.status(200).json({});
            }
            else {
                return next(createError(400, 'INVALID_REQUEST'));
            }
        }
        else {
            return next(createError(400, 'INVALID_REQUEST'));
        }

    } catch (e) {
        console.log(e.message);
        return next(createError(500, e.message));
    }

}

module.exports = postComment;