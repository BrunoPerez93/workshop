import mongoose from 'mongoose';

const modelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true,
  },
}, { timestamps: true });

const Model = mongoose.models.Model || mongoose.model('Model', modelSchema);

export default Model;
