const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerSchema } = require("../Model/registerModel");

module.exports.landing = (req, res) => {
  res.send("Rest, no routes for you 😎😎😎...");
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

// module.exports.userLogin = (req, res) => {
//   console.log(req.body);
// };

module.exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const user = await registerSchema
      .findOne({ email })
      .select(
        "+firstName +lastName +email +phoneNumber +votersCardNumber +nin +age +nationality +stateOfOrigin +lgaOfOrigin +stateOfResidence +token +password"
      );

    if (!user) {
      // User with the provided email does not exist
      console.log("Invalid Email");
      res.send("Invalid email");
    } else {
      // Compare the provided password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        // Passwords do not match
        console.log("Invalid Password");
        res.send("Invalid password");
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
          stateOfResidence: user.stateOfResidence,
        };

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.cookie("jwt", token, {
          maxAge: 900000,
          httpOnly: true,
        });

        console.log(newUser, token);
        res.json({ message: "Login successfully", newUser, token });
      }
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
