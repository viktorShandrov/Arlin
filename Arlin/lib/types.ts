export interface IUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: 'admin' | 'user' | 'teacher' | 'student';
  plan: 'none' | 'basic' | 'enthusiastic' | 'professional';
  planSubscriptionDate?: string;
  exp: number;
  imageURL?: string;
  lastReading?: {
    bookId?: string;
    chapterId?: string;
  };
  testCompleteCirclesCount?: number;
  expMultiplier?: {
    value: number;
    dueTo?: string;
  };
  inventory?: Record<string, any>;
  advancements?: any[];
}

export interface IBook {
  _id: string;
  name: string;
  author: string;
  resume?: string;
  genre?: string;
  image?: string;
  priceInCents?: number;
  length?: number;
  rating?: number;
  isRecommended?: boolean;
  chapters?: string[];
  stripeProductId?: string;
  stripePriceId?: string;
}

export interface IChapter {
  _id: string;
  bookId: string;
  title: string;
  text: string;
  order: number;
}

export interface IWord {
  _id: string;
  word: string;
  translatedText?: string;
  examples?: Array<{
    sentenceWhereWordsIsPresent: string;
    translation: string;
  }>;
  synonyms?: string[];
}

export interface IWordContainer {
  _id: string;
  ownedBy: string;
  name: string;
  colorCode?: string;
  type: 'unspecified' | 'forUnknownWordsCircle' | 'custom';
  words: Array<{
    wordRef: string | IWord;
    answeredRightCount: number;
    lastTimeGivenOnTest?: string;
    addedOn?: string;
    status: 'known' | 'hard';
  }>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}
