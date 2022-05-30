// SPDX-License-Identifier: BUSL-1.1

const {default: testIDs} = require('./testIDs');

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have home screen', async () => {
    await expect(element(by.id(testIDs.screens.home.screen))).toBeVisible();
  });
});
