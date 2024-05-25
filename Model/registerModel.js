const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const registerUser = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: "",
      select: false,
    },

    lastName: {
      type: String,
      default: "",
      select: false,
    },

    email: {
      type: String,
      default: "",
      select: false,
    },

    phoneNumber: {
      type: String,
      default: "",
      select: false,
    },

    votersCardNumber: {
      type: String,
      default: "",
      select: false,
    },

    nin: {
      type: String,
      default: "",
      select: false,
    },

    age: {
      type: String,
      default: "",
      select: false,
    },

    nationality: {
      type: String,
      default: "",
      select: false,
    },

    stateOfOrigin: {
      type: String,
      default: "",
      select: false,
    },

    lgaOfOrigin: {
      type: String,
      default: "",
      select: false,
    },

    stateOfResidence: {
      type: String,
      default: "",
      select: false,
    },

    token: {
      type: String,
      default: "",
      select: false,
    },

    password: {
      type: String,
      default: "",
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const saltRounds = 10;

registerUser.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, saltRounds);
      this.password = hashedPassword;
      next();
    } catch (err) {
      console.error("Error hashing password:", err);
      next(err); // Propagate the error to the next middleware or route handler
    }
  } else {
    next();
  }
});

const registerSchema = mongoose.model("register", registerUser);

module.exports = { registerSchema };
