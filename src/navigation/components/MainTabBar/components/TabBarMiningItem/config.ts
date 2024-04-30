// SPDX-License-Identifier: ice License 1.0

import {LottieViewProps} from '@components/LottieView';
import {MINING_LONG_PRESS_ACTIVATION_SEC} from '@constants/timeouts';
import {LottieAnimations} from '@lottie';
import {MiningState} from '@store/modules/Tokenomics/types';
import {t} from '@translations/i18n';

type GestureConfig = {
  showStackingModal?: boolean;
  startMining?: boolean;
  showDisabledPopup?: boolean;
};

export const MiningButtonConfig: {
  [key in MiningState]: {
    animation: LottieViewProps['source'];
    tooltip?: string;
    showStackingModalOnTransition?: boolean;
    onTap?: GestureConfig;
    onLongPress?: GestureConfig;
  };
} = {
  inactive: {
    animation: LottieAnimations.miningInactive,
    tooltip: t('tabbar.mining_inactive_tooltip'),
    onTap: {
      startMining: true,
    },
    onLongPress: {
      startMining: true,
    },
  },
  active: {
    animation: LottieAnimations.miningActive,
    showStackingModalOnTransition: true,
    onTap: {
      showStackingModal: true,
    },
  },
  restart: {
    animation: LottieAnimations.miningRestart,
    tooltip: t('tabbar.mining_reset_tooltip'),
    onTap: {
      showStackingModal: true,
    },
    onLongPress: {
      startMining: true,
    },
  },
  expire: {
    animation: LottieAnimations.miningExpire,
    tooltip: t('tabbar.mining_reset_tooltip'),
    onTap: {
      showStackingModal: true,
    },
    onLongPress: {
      startMining: true,
    },
  },
  holidayActive: {
    animation: LottieAnimations.miningHolidayActive,
    tooltip: t('tabbar.mining_holiday_active'),
    showStackingModalOnTransition: true,
    onTap: {
      showStackingModal: true,
    },
  },
  holidayRestart: {
    animation: LottieAnimations.miningHolidayRestart,
    tooltip: t('tabbar.mining_holiday_reset_tooltip', {
      seconds: MINING_LONG_PRESS_ACTIVATION_SEC,
    }),
    onTap: {
      showStackingModal: true,
    },
    onLongPress: {
      startMining: true,
    },
  },
  holidayExpire: {
    animation: LottieAnimations.miningHolidayExpire,
    tooltip: t('tabbar.mining_holiday_reset_tooltip', {
      seconds: MINING_LONG_PRESS_ACTIVATION_SEC,
    }),
    onTap: {
      showStackingModal: true,
    },
    onLongPress: {
      startMining: true,
    },
  },
  disabled: {
    animation: LottieAnimations.miningDisabled,
    onTap: {
      showDisabledPopup: true,
    },
  },
};
