// SPDX-License-Identifier: ice License 1.0
/* eslint-disable no-bitwise */

export const capitalizeFirstLetter = (input: string) => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

export const stringToColor = (input: string = '') => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += ('00' + value.toString(16)).slice(-2);
  }
  return colour;
};
