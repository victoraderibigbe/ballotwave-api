const express = require("express");
const {
  registerUsers,
  landing,
  userLogin,
} = require("../Controllers/userController");
const { getVoters } = require("../Controllers/votersApi.Controller");
const { voteNow } = require("../Controllers/candidate.Contorller");
const router = express.Router();

router.get("/", landing);

// POSTS
router.post("/user/login", userLogin);
router.post("/user/register", registerUsers);
router.post("/voters/validate", getVoters);
router.post("/voters/voteNow", voteNow);

module.exports = router;
