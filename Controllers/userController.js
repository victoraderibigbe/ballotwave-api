const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerSchema } = require("../Model/registerModel");

module.exports.landing = (req, res) => {
  res.send("Rest, No Routes for you 😎😎😎...");
};

module.exports.registerUsers = async (req, res) => {
  console.log(req.body);
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    votersCardNumber,
    nin,
    age,
    nationality,
    stateOfOrigin,
    lgaOfOrigin,
    stateOfResidence,
    token,
    password,
  } = req.body;

  try {
    const user = await registerSchema.findOne({
      $or: [
        { email: email },
        { votersCardNumber: votersCardNumber },
        { nin: nin },
      ],
    });

    if (user) {
      console.log("User with credentials found");

      res.send({ message: "User with credentials found" });
    } else {
      console.log("Not found", req.body.nin.length);

      if (req.body.nin.length !== 11) {
        console.log("NIN length is less than or greater than 11");

        res.send({
          message: "The NIN length is less than or greater than 11",
        });
      } else {
        const newUser = new registerSchema({
          firstName,
          lastName,
          email,
          phoneNumber,
          votersCardNumber,
          nin,
          age,
          nationality,
          stateOfOrigin,
          lgaOfOrigin,
          stateOfResidence,
          token,
          password,
        });

        await newUser.save().then(async (response) => {
          console.log({ message: "Successfully signed up", response });
          // You can send a response or perform other actions as needed
          res.send({ message: "Successfully signed up", status: true });
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
