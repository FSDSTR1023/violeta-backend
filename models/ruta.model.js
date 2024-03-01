const mongoose = require('mongoose');

const rutaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  distance: { type: Number, required: true },
  difficulty: { type: String, enum: ['Fácil', 'Moderado', 'Difícil'], required: true },
  maxElevation: { type: Number, required: true },
  minElevation: { type: Number, required: true},
  weather: {
    temperature: { type: Number },
    conditions: { type: String },
  },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  date: { type: Date, required: true },
  totalTimeSpent: { type: Number, required: true },
  trailType: { type: String, enum: ['Loop', 'Point-to-Point', 'Out-and-Back', 'Circuito'], required: true },
  imageUrl: { type: [String] },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
}, {
  timestamps: true
});

module.exports = mongoose.model('Route', rutaSchema);
