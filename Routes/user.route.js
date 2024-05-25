const express = require("express");
const router = express.Router();

// router.get("/");

// POSTS
router.post("/user/register", registerUsers);

module.exports = router;
