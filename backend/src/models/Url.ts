import mongoose, { Schema } from 'mongoose';

const urlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
    trim: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  shortUrl: {
    type: String,
    required: true,
    trim: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

urlSchema.index({ shortCode: 1 });

export const Url = mongoose.model('Url', urlSchema);
