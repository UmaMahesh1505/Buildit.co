import mongoose from "mongoose";
const RequirementSchema = new mongoose.Schema({
  transactionType: {
    type: String,
    enum: ["buy", "sale"],
    required: true,
  },
  propertyType: {
    type: String,
    enum: ["flat", "independentBuilding", "land"],
    required: true,
  },
  area: { type: String, required: true },
  location: { type: String, required: true },
  budget: { type: String, required: true },
  duration: {
    type: String,
    enum: ["immediate", "3months", "6months"],
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Requirement =
  mongoose.models.Requirement ||
  mongoose.model("Requirement", RequirementSchema);
export default Requirement;
