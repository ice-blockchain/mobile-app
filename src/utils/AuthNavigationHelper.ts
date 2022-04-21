// SPDX-License-Identifier: BUSL-1.1

// import store from '@store';

export default () => {
  // const { token, profile } = store.getState().auth;
  const token = ''; //TODO: get from store
  const profile = {}; //TODO: get from store

  if (profile?.profile_filled) {
    return '';
  }

  let initialScreen = 'Intro';

  if (token) {
    initialScreen = 'CheckEmail';
  }

  if (profile?.email) {
    initialScreen = 'ClaimNickname';
  } else {
    initialScreen = 'Welcome';
  }

  return initialScreen;
};
