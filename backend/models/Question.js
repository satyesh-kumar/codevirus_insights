import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  topic: { type: String },
  imageUrl: { type: String },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  answerCount: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

export default mongoose.model("Question", questionSchema);
