import mongoose, { Schema } from 'mongoose';

const rutaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ciudad: { type: String, required: true },
  provincia: { type: String, required: true },
  pais: { type: String, required: true },
  distancia: { type: String, required: true },
  dificultad: { type: String, required: true },
  altitudmax: { type: String, required: true },
  altitudmin: { type: String, required: true},
  tiempo: { type: String, required: true },
  descrpcion: { type: String, required: true },
  createdAt: { type: Date },
  modifiedAt: { type: Date },
  deletedAt: { type: Date, default: null },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Ruta = mongoose.model('Ruta', rutaSchema);

export default Ruta;