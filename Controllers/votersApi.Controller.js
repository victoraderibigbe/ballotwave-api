const { voters } = require("../Model/votersApi.Model");

// GET VOTERS AVAILABLE
module.exports.getVoters = async (req, res) => {
  //   console.log(voters, voters.length, req.body);
  try {
    const findUserWithCode = voters.find(
      (item) => item.passKey === req.body.code
    );
    console.log(findUserWithCode);
    if (findUserWithCode) {
      console.log("User with Id exist");
      res.status(200).send({ message: "User with Id exist", findUserWithCode });
    } else {
      console.log("User with Id doesn't exist");
      res.status(400).json("User with Id doesn't exist");
    }
  } catch (err) {
    console.log(err);
  }
};
