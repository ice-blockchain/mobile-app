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
