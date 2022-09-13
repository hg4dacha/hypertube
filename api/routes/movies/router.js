/**
 * Regroupe toutes les fonction lié au movies
 */
 const express = require("express");
 const router = express.Router();
 
 const checkToken = require("../../middlewares/checkToken");
 
 const getMovies = require("./getMovies");
 const getMovieData = require("./getMovieData");

 
 router.get("/", checkToken, getMovies);
 router.get("/data", checkToken, getMovieData);
 
 module.exports = router;