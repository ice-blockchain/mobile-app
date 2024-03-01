// SPDX-License-Identifier: ice License 1.0

const PLURALIZATION_KEYS = ['zero', 'one', 'two', 'few', 'many', 'other'];

export const isPluralizationNode = node => {
  if (typeof node !== 'object') {
    return false;
  }
  return Object.keys(node).every(
    key => PLURALIZATION_KEYS.includes(key) && typeof node[key] === 'string',
  );
};
