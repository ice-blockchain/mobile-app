// SPDX-License-Identifier: ice License 1.0

export type EmojiCategory =
  | 'recent'
  | 'smileys_people'
  | 'animals_nature'
  | 'food_drink'
  | 'activities'
  | 'travel_places'
  | 'objects'
  | 'symbols'
  | 'flags'
  | 'search_results';

export type EmojiData = {
  keywords: string[];
  emoji: string;
};
export type EmojisByCategory = {
  data: EmojiData[];
  title: EmojiCategory;
};
export type EmojiSelectorSection = {
  data: EmojiData[][];
  title: EmojiCategory;
};
export type EmojiCategoryOffset = {
  offset: number;
  category: EmojiCategory;
};
