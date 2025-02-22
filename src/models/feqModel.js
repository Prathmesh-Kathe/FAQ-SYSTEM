const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      unique: true, 
    },
    answer: {
      type: String,
      required: true,
    },
    translations: {
      hi: { type: String }, 
      hi_answer: { type: String }, 
      bn: { type: String }, 
      bn_answer: { type: String }, 
    },
  },
  {
    timestamps: true, 
  }
);


const FAQ = mongoose.model("FAQ", faqSchema);

module.exports = FAQ;
