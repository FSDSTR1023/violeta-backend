// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   nombre: { type: String, required: true },
//   apellido1: { type: String, default: ''},
//   apellido2: { type: String, default: ''},
//   nickname: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   estado: {
//     type: String,
//     enum: ['activa', 'inactiva', 'pendiente'],
//     default: 'pendiente'
//   },
//   createdAt: { type: Date },
//   modifiedAt: { type: Date },
//   deletedAt: { type: Date, default: null }
// }, {
//   timestamps: true
// });

// userSchema.index({ nickname: 1, email: 1}, { unique: true })

// const User = mongoose.model('User', userSchema);

// export default User;