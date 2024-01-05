import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, default: ''},
  nickname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  state: {
    type: String,
    enum: ['connected', 'disconnected', 'pending'],
    default: 'pending'
  },
  createdAt: { type: Date },
  modifiedAt: { type: Date },
  deletedAt: { type: Date, default: null }
}, {
  timestamps: true
});

userSchema.index({ nickname: 1, email: 1}, { unique: true })

const User = mongoose.model('User', userSchema);

export default User;