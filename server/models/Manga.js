const { Schema } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const mangaSchema = new Schema({
  status: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  mangaId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = mangaSchema;
