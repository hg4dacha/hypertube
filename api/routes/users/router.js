/**
 * Regroupe toutes les fonction lié au user
 */
const express = require("express");
const router = express.Router();

const checkToken = require("../../middlewares/checkToken");

const auth = require("./auth");
const oauth = require("./oauth");
const addUser = require("./addUser");
const editUserData = require("./editUserData");
const getAllUsers = require("./getAllUsers");
const forgottenPassword = require("./forgottenPassword");
const editPassword = require("./editPassword");


router.post("/auth", auth);
router.post("/oauth", oauth);
router.post("/add", addUser);
router.post("/password", forgottenPassword);
router.put("/password", editPassword);
router.put("/edit", checkToken, editUserData);
router.get("/", checkToken, getAllUsers);

module.exports = router;