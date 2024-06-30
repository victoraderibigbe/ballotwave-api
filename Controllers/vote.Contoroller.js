const { vote } = require("../Model/vote.Model");
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
      const hasVoted = await vote.findOne({ votersName });

      if (hasVoted) {
        console.log("You have already voted and cannot vote again");
        res.status(401).send({
          message: "Your vote has been counted and cannot vote again",
        });
      } else {
        // Save the vote for the candidate
        const newVote = new vote({ votersName, candidateName, partyName });
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

// TO COUNT VOTES
module.exports.countVote = async (req, res) => {
  const { votersName, votersCode } = req.body;

  try {
    const validateVoters = voters.find(
      (item) => item.passKey === votersCode && item.name === votersName
    );
    //  console.log(validateVoters);

    if (!validateVoters) {
      console.log("Voter with Id doesn't exist");
      res.status(400).send({ message: "User with Id doesn't exist" });
    } else {
      // console.log(validateVoters);

      const getVote = await vote.find({});
      // console.log(getVote);
      const APC = getVote.filter((item) => item.partyName === "APC");
      console.log("APC", APC.length);

      const PDP = getVote.filter((item) => item.partyName === "PDP");
      console.log("PDP", PDP.length);

      const data = {
        APC: APC.length,
        PDP: PDP.length,
      };
      console.log(data);
      console.log("Voters Found");
      res.status(200).json(data);
    }
  } catch (err) {
    console.log(err);
  }
};
