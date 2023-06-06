// SPDX-License-Identifier: ice License 1.0

import {ROW_HEIGHT} from '@screens/modals/EmojiSelector/components/EmojiRow';
import {EMOJI_PER_ROW} from '@screens/modals/EmojiSelector/constants';
import {
  EmojiCategoryOffset,
  EmojiData,
  EmojisByCategory,
  EmojiSelectorSection,
} from '@screens/modals/EmojiSelector/type';
import {normalizeSearchValue} from '@utils/string';

export function splitArrayIntoChunks(array: EmojiData[]): EmojiData[][] {
  let result: EmojiData[][] = [];
  let i = 0;

  while (i < array.length) {
    result.push(array.slice(i, i + EMOJI_PER_ROW));
    i += EMOJI_PER_ROW;
  }

  return result;
}

export function toEmojiSelectorSections(emojisData: EmojisByCategory[]) {
  return emojisData.map(({data, title}: EmojisByCategory) => ({
    title,
    data: splitArrayIntoChunks(data),
  }));
}

export function getCategoryOffsets(
  sections: EmojiSelectorSection[],
): EmojiCategoryOffset[] {
  const result: EmojiCategoryOffset[] = [];
  let offset = 0;
  sections.forEach(section => {
    offset += ROW_HEIGHT * (section.data.length + 1);
    result.push({
      category: section.title,
      offset,
    });
  });
  return result;
}

function getOffset(data: EmojiSelectorSection[], index: number) {
  let offset = 0;
  let cursor = index;

  data.some(section => {
    const sectionLength = section.data.length;
    if (cursor > sectionLength) {
      offset += (sectionLength + 1) * ROW_HEIGHT;
      cursor -= sectionLength + 1;
      return false; // Continue to next section
    } else {
      offset += cursor * ROW_HEIGHT;
      return true; // Break out of the loop
    }
  });

  return offset;
}

export const getItemLayout = (
  data: EmojiSelectorSection[] | null,
  index: number,
) => {
  if (data) {
    return {
      length: ROW_HEIGHT,
      offset: getOffset(data, index),
      index,
    };
  }

  return {
    length: 0,
    offset: 0,
    index: 0,
  };
};

export function findEmojis({
  searchValue,
  sections,
}: {
  searchValue: string;
  sections: EmojiSelectorSection[];
}): EmojiData[] {
  const normalizedSearchValue = normalizeSearchValue(searchValue);
  const result: EmojiData[] = [];
  if (!normalizedSearchValue) {
    return result;
  }
  sections.forEach(section => {
    section.data.forEach(dataArray => {
      result.push(
        ...dataArray.filter(data =>
          data.keywords.some(keyword =>
            keyword.includes(normalizedSearchValue),
          ),
        ),
      );
    });
  });

  return result;
}
