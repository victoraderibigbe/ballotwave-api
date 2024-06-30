const express = require("express");
const {
  registerUsers,
  landing,
  userLogin,
} = require("../Controllers/userController");
const { getVoters } = require("../Controllers/votersApi.Controller");
const { voteNow, countVote } = require("../Controllers/vote.Contoroller");
const router = express.Router();

// GET
router.get("/", landing);

// POSTS
router.post("/user/login", userLogin);
router.post("/user/register", registerUsers);
router.post("/voters/validate", getVoters);
router.post("/voters/voteNow", voteNow);
router.post("/voters/countVote", countVote);

module.exports = router;
