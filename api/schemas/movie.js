const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    movieId: String,
    movieTitle: String,
    torrent: String
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;