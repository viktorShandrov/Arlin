import mongoose, { Schema, model, models } from 'mongoose';

const WordContainerSchema = new Schema(
  {
    ownedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    colorCode: String,
    type: {
      type: String,
      enum: ['unspecified', 'forUnknownWordsCircle', 'custom'],
      default: 'custom',
    },
    words: [
      {
        wordRef: { type: Schema.Types.ObjectId, ref: 'UnknownWord' },
        answeredRightCount: { type: Number, default: 0 },
        lastTimeGivenOnTest: Date,
        addedOn: { type: Date, default: Date.now },
        status: {
          type: String,
          enum: ['known', 'hard'],
          default: 'hard',
        },
      },
    ],
  },
  { timestamps: true }
);

export const WordContainer = models.UnknownWordContainer || model('UnknownWordContainer', WordContainerSchema);
