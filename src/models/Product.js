const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ImageProduct",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", ProductSchema);
