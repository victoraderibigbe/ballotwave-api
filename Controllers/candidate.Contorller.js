const { Candidate } = require("../Model/candidate.Model");
const { voters } = require("../Model/votersApi.Model");

// VOTE FOR CANDIDATES
module.exports.voteNow = async (req, res) => {
  console.log(req.body);
  const { votersName, votersCode, candidateName, partyName } = req.body;

  try {
    // Validate voter
    const validateVoters = voters.find(
      (item) => item.passKey === votersCode && item.name === votersName
    );
    console.log(validateVoters);

    if (validateVoters) {
      console.log("Voter with Id exists");

      // Check if voter has already voted
      const hasVoted = await Candidate.findOne({ votersName });

      if (hasVoted) {
        console.log("You have already voted and cannot vote again");
        res
          .status(401)
          .send({ message: "You have already voted and cannot vote again" });
      } else {
        // Save the vote for the candidate
        const newVote = new Candidate({ votersName, candidateName, partyName });
        await newVote.save();

        console.log("Voting successful");
        res.status(200).send({ message: "Voting successful" });
      }
    } else {
      console.log("Voter with Id doesn't exist");
      res.status(400).send({ message: "User with Id doesn't exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};
