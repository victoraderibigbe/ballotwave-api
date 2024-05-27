const express = require("express");
const {
  registerUsers,
  landing,
  userLogin,
} = require("../Controllers/userController");
const router = express.Router();

router.get("/", landing);

// POSTS
router.post("/user/login", userLogin);
router.post("/user/register", registerUsers);

module.exports = router;
