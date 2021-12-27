const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contacts = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contacts", contacts);

module.exports = Contact;
