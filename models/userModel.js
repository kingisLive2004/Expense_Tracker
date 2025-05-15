const mongoose = require("mongoose");

//schema design
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required and should be unique"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required "],
      unique: true,
      minlength: [8, "password should be atleast 8 characters"],
    },
  },
  { timestamps: true }
);

//export
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
