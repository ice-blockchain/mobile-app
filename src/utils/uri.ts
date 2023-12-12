// SPDX-License-Identifier: ice License 1.0

export function isValidURI(uri: string | undefined) {
  if (!uri) {
    return false;
  }
  try {
    // eslint-disable-next-line no-new
    new URL(uri);
    return true;
  } catch (error) {
    return false;
  }
}
