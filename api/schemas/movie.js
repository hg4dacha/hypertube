const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    movieId: String,
    path: String,
    lastView: String
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;