import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: false },
  ci: { type: String, unique: true, required: false },
  cellphone: { type: String, required: true },
}, {
  timestamps: true,
});

const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);

export default Client;
