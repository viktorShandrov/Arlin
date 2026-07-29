import mongoose, { Schema, model, models } from 'mongoose';

const ChapterSchema = new Schema(
  {
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    order: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const Chapter = models.Chapter || model('Chapter', ChapterSchema);
