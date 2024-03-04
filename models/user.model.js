const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, default: ''},
  nickname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  state: {
    type: String,
    enum: ['connected', 'disconnected', 'pending'],
    default: 'pending'
  },
  level: {
    type:String,
    enum:['Principiante', 'Avanzado', 'Experto'],
    default:'Principiante'
  },
  createdAt: { type: Date },
  modifiedAt: { type: Date },
  deletedAt: { type: Date, default: null }
}, {
  timestamps: true
});

userSchema.index({ nickname: 1, email: 1}, { unique: true })

module.exports = mongoose.model('User', userSchema);
