// SPDX-License-Identifier: BUSL-1.1

export const Images = {
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
  phone: {
    confirmCode: require('./phone/confirmCode.png'),
    confirmPhone: require('./phone/confirmPhone.png'),
  },
} as const;
