
import mongoose from 'mongoose';

const WorkSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  matricula: { type: String, required: true },
  km: { type: Number },
  anio: { type: Number },
  fallo: { type: String },
  repuestosInfo: { type: String },
  observaciones: { type: String },
  tecnico: { type: String },
  manoDeObra: { type: Number, required: true },
  repuesto: { type: Number, required: true },
  total: { type: Number, required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Work || mongoose.model('Work', WorkSchema);
