// SPDX-License-Identifier: ice License 1.0

export function shallowCompare<T>(a1: T[], a2: T[]) {
  if (a1.length !== a2.length) {
    return false;
  }
  return a1.every((value, index) => value === a2[index]);
}
