/**
 * Fichier utiliser via app.js pour faire le routing de chaque dossier
 */
const express = require("express");
const router = express.Router();

const userRouter = require("./users/router");
const authRouter = require("./auth/omniauth");
const moviesRouter = require("./movies/router");
const movieRouter = require("./movie/router");
const commentsRouter = require("./comments/router");


router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/movies", moviesRouter);
router.use("/movie", movieRouter);
router.use("/comments", commentsRouter);


module.exports = router;