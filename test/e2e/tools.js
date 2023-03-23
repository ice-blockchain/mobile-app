// SPDX-License-Identifier: ice License 1.0

import {by, element, expect} from 'detox';

export const wait = (timeout = 0) =>
  new Promise(resolve => setTimeout(resolve, timeout));

export const seconds = (amount = 0) => amount * 1000;

export const minutes = (amount = 0) => amount * seconds(60);

export const has = async testID => expect(element(by.id(testID))).toBeVisible();

export const tap = async testID => {
  const button = await element(by.id(testID));
  return button.tap();
};

export const find = async testID => element(by.id(testID));

export const fill = async (testID, text) => {
  const input = await find(testID);
  await input.replaceText('');
  return input.typeText(text + '\n');
};

export const scrollToBottom = async testID => {
  return element(by.id(testID)).swipe('up', 'fast', 0.75);
};

export const scrollToTop = async testID => {
  return element(by.id(testID)).swipe('down', 'fast', 0.75);
};

export const getRandomPhoneNumber = (
  countryCode = 380,
  operatorCode = 57,
  size = 12,
) => {
  const usedLength = `${countryCode}${operatorCode}`.length;
  const randomDigits = `${(Date.now() / 100).toFixed(0)}`;
  const number = randomDigits.slice(usedLength - size);
  return `${countryCode}${operatorCode}${number}`;
};

export const iOS = device.getPlatform() === 'ios';

export const android = device.getPlatform() === 'android';

export const waitForElement = async (testID, timeout = seconds(5)) =>
  waitFor(element(by.id(testID)))
    .toBeVisible()
    .withTimeout(timeout);
