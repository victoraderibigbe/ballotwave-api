const express = require("express");
const {
  registerUsers,
  landing,
  userLogin,
} = require("../Controllers/userController");
const { getVoters } = require("../Controllers/votersApi.Controller");
const router = express.Router();

router.get("/", landing);

// POSTS
router.post("/user/login", userLogin);
router.post("/user/register", registerUsers);
router.post("/voters/validate", getVoters);

module.exports = router;
