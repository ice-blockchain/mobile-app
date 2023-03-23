// SPDX-License-Identifier: ice License 1.0

export const Images = {
  tabbar: {
    itemBackground: require('./tabbar/item-background.png'),
    miningBackground: require('./tabbar/mining-background.png'),
  },
  roles: {
    ambassador: require('./roles/ambassador.png'),
    // TODO: Add actual image once needed
    ambassadorInactive: require('./roles/pioneer-inactive.png'),
    snowman: require('./roles/pioneer.png'),
    snowmanInactive: require('./roles/pioneer-inactive.png'),
  },
  badges: {
    iceBreaker: {
      active: require('./badges/ice-breaker-active.png'),
      inactive: require('./badges/cool-breeze-inactive.png'),
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
      active: require('./badges/mastermind-active.png'),
    },
  },
  phone: {
    confirmPhoneNumber: require('./phone/confirmPhoneNumber.png'),
    modifyPhoneNumber: require('./phone/modifyPhoneNumber.png'),
  },
  backgrounds: {
    linesBg: require('./backgrounds/linesBg.png'),
    privacyBgTop: require('./backgrounds/privacyBgTop.png'),
    privacyBgMiddle: require('./backgrounds/privacyBgMiddle.png'),
    privacyBgBottom: require('./backgrounds/privacyBgBottom.png'),
    linesHeaderBg: require('./backgrounds/linesHeaderBg.png'),
    adoptionCardBg: require('./backgrounds/adoptionCardBg.png'),
    levelCardBg: require('./backgrounds/levelCardBg.png'),
    referralsCardBg: require('./backgrounds/referralsCardBg.png'),
    walkthroughBg: require('./backgrounds/walkthrough.png'),
  },
  popUp: {
    updateRequired: require('./popup/please_update.png'),
    error: require('./popup/oops.png'),
    upToDate: require('./popup/already_updated.png'),
    resurrection: require('./popup/resurrection.png'),
    telegram: require('./popup/telegram.png'),
    earlyAccess: require('./popup/earlyAccess.png'),
  },
} as const;
