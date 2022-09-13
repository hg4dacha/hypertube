/**
 * Regroupe toutes les fonction lié au movie
 */
 const express = require("express");
 const router = express.Router();
 
//  const checkToken = require("../../middlewares/checkToken");

 const getMovieComments = require("../comments/getMovieComments");
 const getMovieDataViaUrl = require("./getMovieDataViaUrl");


 router.get("/:id/comments", getMovieComments);
 router.get("/:id", getMovieDataViaUrl);
 
 module.exports = router;