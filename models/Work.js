import mongoose from 'mongoose';

const workSchema = new mongoose.Schema({
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  model: { type: mongoose.Schema.Types.ObjectId, ref: 'Model' },
  matricula: String,
  km: Number,
  anio: Number,
  fallo: String,
  repuestosInfo: String,
  observaciones: String,
  tecnico: { type: mongoose.Schema.Types.ObjectId, ref: 'Mechanic' },
  manoDeObra: Number,
  repuesto: Number,
  total: Number,
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
}, { timestamps: true });

const Work = mongoose.models.Work || mongoose.model('Work', workSchema);

export default Work;
