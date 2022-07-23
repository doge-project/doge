import mongoose, { Schema } from 'mongoose';
import { hash as _hash } from 'bcrypt';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false, //? this field won't be fetched by default
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function(next) {
  const hash = await _hash(this.password, 10);
  this.password = hash;
  next();
});

export default mongoose.model('User', UserSchema);
