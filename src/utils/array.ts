// SPDX-License-Identifier: ice License 1.0

export function shallowCompare<T>(a1: T[], a2: T[]) {
  if (a1.length !== a2.length) {
    return false;
  }
  return a1.every((value, index) => value === a2[index]);
}

export function shallowCompareUnsorted<T>(
  a1: T[] | Readonly<T[]>,
  a2: T[] | Readonly<T[]>,
) {
  if (a1.length !== a2.length) {
    return false;
  }

  const diff = new Set(a1);

  for (let value of a2) {
    if (diff.size === 0) {
      return false;
    }
    if (!diff.delete(value)) {
      return false;
    }
  }

  return true;
}

/**
 * Algorithm Fisher-Yates (aka Knuth) Shuffle
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */
export const shuffle = <T>(array: T[]) => {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
