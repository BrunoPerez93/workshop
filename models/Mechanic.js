import mongoose from "mongoose";

const mechanicSchema = new mongoose.Schema({
  username: { type: String, required: true },
}, {
  timestamps: true,
});

const Mechanic = mongoose.models.Mechanic || mongoose.model("Mechanic", mechanicSchema);

export default Mechanic;
