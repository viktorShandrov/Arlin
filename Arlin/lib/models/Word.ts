import mongoose, { Schema, model, models } from 'mongoose';

const WordSchema = new Schema(
  {
    word: { type: String, required: true, unique: true },
    translatedText: String,
    examples: [
      {
        sentenceWhereWordsIsPresent: String,
        translation: String,
      },
    ],
    synonyms: [String],
  },
  { timestamps: true }
);

export const Word = models.UnknownWord || model('UnknownWord', WordSchema);
