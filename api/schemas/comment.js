const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    userId: String,
    movieId: String,
    comment: String
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;