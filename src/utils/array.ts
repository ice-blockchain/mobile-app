// SPDX-License-Identifier: ice License 1.0

export function returnSecondIfNew<T>(a1: T[], a2: T[]) {
  if (a1.length !== a2.length) {
    return a2;
  }
  if (a1.every((value, index) => value === a2[index])) {
    return a1;
  }
  return a2;
}
