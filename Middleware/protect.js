const jwt = require("jsonwebtoken");
const { registerSchema } = require("../models/user.Model");
const catchAsync = require("../utils/catchAsync");

module.exports = catchAsync(async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  console.log("Token from front ", token);
  if (!token) {
    console.log("Token not found!");
    throw Error("Token not found!");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await registerSchema.findById(decoded.id);
  if (!user) {
    console.log("User has been deleted!");
    throw Error("User has been deleted!");
  }
  next();
});
