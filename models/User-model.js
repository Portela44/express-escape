const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
    }, 
    age: {
        type:Number,
    },
    email: {
        type:String,
    },
    hashedPassword: {
      type: String,
      required: [true, "Password is required."] 
    }
  },
  {
  timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

