/**
 * Regroupe toutes les fonction lié aux movies
 */
 const express = require("express");
 const router = express.Router();
 
 const checkToken = require("../../middlewares/checkToken");
 
 const getMovies = require("./getMovies");
 const getMovieData = require("./getMovieData");
 const torrents = require("./torrentManagement");

 
 router.get("/", checkToken, getMovies);
 router.get("/data", checkToken, getMovieData);
 router.get("/subtitles/:movieId", checkToken, torrents.getSubtitles);
 router.get("/:movieId/:userId/:source", torrents.getMovieStream);

 
 module.exports = router;