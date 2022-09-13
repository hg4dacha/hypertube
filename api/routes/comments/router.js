/**
 * Regroupe toutes les fonction lié au commentaires
 */
 const express = require("express");
 const router = express.Router();
 
 const checkToken = require("../../middlewares/checkToken");

 const postComment = require("./postComment");
 const getMovieComments = require("./getMovieComments");
 
 
 router.post("/", checkToken, postComment);
 router.get("/:id", getMovieComments);
 
 module.exports = router;