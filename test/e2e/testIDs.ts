// SPDX-License-Identifier: BUSL-1.1

export default {
  screens: {
    intro: {
      screen: 'intro',
      emailAuth: 'emailAuth',
      phoneAuth: 'phoneAuth',
      appleAuth: 'appleAuth',
      googleAuth: 'googleAuth',
      fbAuth: 'fbAuth',
      twitterAuth: 'twitterAuth',
    },
    nickname: {
      screen: 'name',
      nicknameInput: 'nicknameInput',
      next: 'next',
    },
    invite: {
      screen: 'invite',
      complete: 'complete',
      usernameInput: 'usernameInput',
    },
    welcome: {
      screen: 'welcome',
      submit: 'next',
      notNow: 'notNow',
      yes: 'yes',
    },
    home: {
      screen: 'home',
    },
    team: {
      screen: 'team',
    },
    news: {
      screen: 'news',
    },
    profile: {
      screen: 'profile',
    },
    myRoles: {
      screen: 'myRoles',
    },
    settings: {
      screen: 'settings',
      openSettings: 'openSettings',
    },
  },
  components: {
    mainTabBar: {
      component: 'mainTabBar',
      home: 'homeTab',
      team: 'teamTab',
      news: 'newsTab',
      profile: 'profileTab',
    },
    back: 'back',
    tab: (key = 0, prefix = '', postfix = '') =>
      `${prefix}_tab_${key}_${postfix}`,
    listItem: (index = 0, prefix = 'list') => `${prefix}_item_${index}`,
  },
};
