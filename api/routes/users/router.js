/**
 * Regroupe toutes les fonction lié au user
 */
const express = require("express");
const router = express.Router();

// const checkToken = require("../../../middlewares/checkToken");
// const checkSector = require("../../../middlewares/checkSector");
// const checkRoles = require("../../../middlewares/checkRoles");

// const Rights = require("../../../config/rights");

const auth = require("./auth");
// const getUser = require('./getUser');
// const getSectorUsers = require("./getSectorUsers");
// const getAllUser = require("./getAllUser");
// const patchUserIdGroupRightMams = require("./patchUserIdGroupRightMams");

router.post("/auth", auth);
// router.get('/@me', checkToken, getUser);
// router.get("/:id", checkToken, checkRoles('read_users'), getUser);
// router.get("/sector/:id_sector", checkToken, checkSector, checkRoles(Rights.ADD_EDIT_DELETE_RIGHTS), getSectorUsers);
// router.get("/", checkToken, checkRoles(Rights.ADD_EDIT_DELETE_COMPANIES), getAllUser);
// router.patch("/user/:id_user/sector/:id_sector", checkToken, checkSector, checkRoles(Rights.ADD_EDIT_DELETE_RIGHTS), patchUserIdGroupRightMams);

module.exports = router;
