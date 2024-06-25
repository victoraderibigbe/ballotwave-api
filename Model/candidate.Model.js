const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    partyName: {
      type: String,
      required: true,
    },
    candidateName: {
      type: String,
      required: true,
    },
    votersName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = { Candidate };
