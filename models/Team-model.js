const { Schema, model } = require("mongoose");

const teamSchema = new Schema(
  {
    name: {
      type: String,
    }, 
    participants: {
        type:[Schema.Types.ObjectId],
        ref:"User-model"
    },
  },
  {
  timestamps: true,
  }
);

const Team = model("Team", teamSchema);

module.exports = Team;
