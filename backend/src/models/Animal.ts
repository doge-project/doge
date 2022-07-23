import mongoose, { Schema } from 'mongoose';

const AnimalSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  species: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Female', 'Male'],
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
    default: null,
  },
  imgsUrls: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model('Animal', AnimalSchema);
