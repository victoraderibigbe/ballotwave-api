const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerSchema } = require("../Model/registerModel");

module.exports.landing = (req, res) => {
  res.send("Rest, No Route for you 😎😎😎...");
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
    countryOfResidence,
    stateOfResidence,
    lgaOfResidence,
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
      console.log("User already exists");
      res.status(400).json({ message: "User already exists" });
    } else {
      console.log("Not found", req.body.nin.length);

      if (req.body.nin.length !== 11) {
        console.log("NIN length is less or greater than 11");

        res.send({
          message: "The NIN length is less or greater than 11",
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
          countryOfResidence,
          stateOfResidence,
          lgaOfResidence,
          token,
          password,
        });

        await newUser.save().then(async (response) => {
          console.log({ message: "Registration Successful", response });
          res.send({ message: "Registration Successful", status: true });
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.userLogin = async (req, res) => {
  const { votersId, password } = req.body;
  console.log(req.body);

  try {
    const user = await registerSchema
      .findOne({ votersCardNumber: votersId })
      .select(
        "+firstName +lastName +email +phoneNumber +votersCardNumber +nin +age +nationality +stateOfOrigin +lgaOfOrigin +countryOfResidence +stateOfResidence +lgaOfResidence +token +password"
      );

    if (!user) {
      // User with the provided email does not exist
      console.log("Invalid votersId");
      res.status(400).send("Invalid votersId");
    } else {
      // Compare the provided password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        // Passwords do not match
        console.log("Invalid Password");
        res.status(400).send("Invalid password");
      } else {
        // Passwords match, login successful
        const newUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          votersCardNumber: user.votersCardNumber,
          nin: user.nin,
          age: user.age,
          nationality: user.nationality,
          stateOfOrigin: user.stateOfOrigin,
          lgaOfOrigin: user.lgaOfOrigin,
          countryOfResidence: user.countryOfResidence,
          stateOfResidence: user.stateOfResidence,
          lgaOfResidence: user.lgaOfResidence,
        };

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.cookie("jwt", token, {
          maxAge: 900000,
          httpOnly: true,
        });

        console.log(newUser, token);
        res.status(200).json({ message: "Login successful", newUser, token });
      }
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error", error);
    res.status(500).json({ message: "Server error" });
  }
};
