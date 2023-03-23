// SPDX-License-Identifier: ice License 1.0

const {seconds, wait} = require('test/e2e/tools');

describe('Sign in', () => {
  beforeEach(async () => {
    await device.launchApp();
  });

  it('should have "Sign in" title', async () => {
    await wait(seconds(15));
    await waitFor(element(by.id('welcome_title'))).toBeVisible();
  });
});
