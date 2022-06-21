// SPDX-License-Identifier: BUSL-1.1

export const Images = {
  welcome: {
    welcome1: require('./welcome/welcome1.png'),
    welcome2: require('./welcome/welcome2.png'),
    welcome3: require('./welcome/welcome3.png'),
    welcome4: require('./welcome/welcome4.png'),
    welcome5: require('./welcome/welcome5.png'),
    welcome6: require('./welcome/welcome6.png'),
    logoIcon: require('./logo-icon.png'),
  },
  tabbar: {
    itemBackground: require('./tabbar/item-background.png'),
    miningBackground: require('./tabbar/mining-background.png'),
  },
  roles: {
    ambassador: require('./roles/ambassador.png'),
    pioneer: require('./roles/pioneer.png'),
  },
  badges: {
    iceBreaker: {
      active: require('./badges/ice-breaker-active.png'),
    },
    troubleMaker: {
      active: require('./badges/trouble-maker-active.png'),
    },
    snowyPlow: {
      active: require('./badges/snowy-plow-active.png'),
    },
    frozenMax: {
      active: require('./badges/frozen-max-active.png'),
    },
    coolBreeze: {
      inactive: require('./badges/cool-breeze-inactive.png'),
    },
    bigContender: {
      inactive: require('./badges/big-contender-inactive.png'),
    },
    mastermind: {
      inactive: require('./badges/mastermind-inactive.png'),
    },
  },
} as const;
