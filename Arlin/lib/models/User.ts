import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'user', 'teacher', 'student'],
      default: 'student',
    },
    plan: {
      type: String,
      enum: ['none', 'basic', 'enthusiastic', 'professional'],
      default: 'none',
    },
    planSubscriptionDate: { type: String, default: '' },
    lastReading: {
      bookId: { type: Schema.Types.ObjectId, ref: 'Book' },
      chapterId: { type: Schema.Types.ObjectId, ref: 'Chapter' },
    },
    testCompleteCirclesCount: { type: Number, default: 0 },
    exp: { type: Number, default: 0 },
    expMultiplier: {
      value: { type: Number, default: 1 },
      dueTo: Date,
    },
    imageURL: String,
    inventory: { type: Object, default: {} },
    advancements: { type: Array, default: [] },
  },
  { timestamps: true }
);

export const User = models.User || model('User', UserSchema);
