const express = require("express");
const {
  registerUsers,
  landing,
  userLogin,
} = require("../Controllers/userController");
const router = express.Router();

router.get("/", landing);

// POSTS
router.post("/user/userLogin", userLogin);
router.post("/user/user-register", registerUsers);

module.exports = router;
