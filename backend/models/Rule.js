import mongoose from "mongoose";

const RuleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pattern: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: String, required: true }, // Must be provided when creating a rule
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  version: { type: Number, default: 1 },
});

export default mongoose.model("Rule", RuleSchema);
