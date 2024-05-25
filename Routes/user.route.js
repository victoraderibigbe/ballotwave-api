const express = require("express");
const { registerUsers } = require("../Controllers/userController");
const router = express.Router();

// router.get("/");

// POSTS
router.post("/user/register", registerUsers);

module.exports = router;
