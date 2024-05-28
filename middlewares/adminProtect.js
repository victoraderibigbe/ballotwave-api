const jwt = require("jsonwebtoken");
const { newAdmin } = require("../models/user.Model");
const catchAsync = require("../utils/catchAsync");

module.exports = catchAsync(async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  console.log("Token from front ", token);
  if (!token) {
    console.log("Token not found!");
    throw Error("Token not found!");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   console.log(decoded);
  //   console.log(decoded.id);

  const admin = await newAdmin.findById(decoded.id);
  if (!admin) {
    console.log("Admin has been deleted!");
    throw Error("Admin has been deleted!");
  }
  next();
});
