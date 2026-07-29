import mongoose, { Schema, model, models } from 'mongoose';

const BookSchema = new Schema(
  {
    ownedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }],
    wishedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    name: { type: String, required: true },
    priceInCents: { type: Number, default: 0 },
    length: Number,
    image: String,
    author: String,
    resume: String,
    genre: String,
    stripeProductId: String,
    stripePriceId: String,
    releaseDate: Date,
    rating: { type: Number, default: 0 },
    isRecommended: { type: Boolean, default: false },
    reviews: [
      {
        stars: Number,
        text: { type: String, default: '' },
        writtenBy: { type: Schema.Types.ObjectId, ref: 'User' },
        likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      },
    ],
  },
  { timestamps: true }
);

export const Book = models.Book || model('Book', BookSchema);
