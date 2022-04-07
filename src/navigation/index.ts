// SPDX-License-Identifier: BUSL-1.1

import ref from './ref';

class Navigation {
  _navigation;

  constructor(navigation: object) {
    this._navigation = navigation;
  }

  navigate(screen: string, params?: object) {
    try {
      return this._navigation?.current?.navigate(screen, params);
    } catch (err) {
      // logger.error('Navigation error: ', err.message);
    }
  }

  goBack() {
    return this._navigation?.current?.goBack();
  }

  getParams() {
    return this._navigation?.current?.getCurrentRoute()?.params || {};
  }

  getCurrentRoute() {
    return this._navigation?.current?.getCurrentRoute()?.name;
  }
}

export default new Navigation(ref);
