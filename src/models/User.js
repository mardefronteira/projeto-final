const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    /*Username é necessário? ou validaremos apenas com e-mail?*/
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordhash: {
      type: String,
      required: true,
    },
    admin: false,
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UserSchema);
