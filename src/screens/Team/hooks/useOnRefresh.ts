// SPDX-License-Identifier: ice License 1.0

import {useRefresh} from '@hooks/useRefresh';
import {AccountActions} from '@store/modules/Account/actions';
import {activeTabSelector} from '@store/modules/ActiveTab/selectors';
import {getIsInitialStartAction} from '@store/modules/Referrals/utils/utils';
import {hapticFeedback} from '@utils/device';
import {useEffect, useRef} from 'react';
import {
  runOnJS,
  SharedValue,
  useAnimatedReaction,
} from 'react-native-reanimated';
import {useSelector} from 'react-redux';

const REFRESH_ACTIONS = [
  AccountActions.GET_ACCOUNT,
  getIsInitialStartAction('CONTACTS'),
  getIsInitialStartAction('T1'),
  getIsInitialStartAction('T2'),
];

export const useOnRefresh = (animatedIndex: SharedValue<number>) => {
  const {onRefresh, refreshing} = useRefresh(REFRESH_ACTIONS);

  const canBeActivatedRef = useRef(false);
  const hapticOnRefresh = () => {
    if (canBeActivatedRef.current) {
      hapticFeedback();
      onRefresh();
      canBeActivatedRef.current = false;
    }
  };

  const resetHapticOnRefresh = () => {
    canBeActivatedRef.current = true;
  };

  useAnimatedReaction(
    () => {
      return animatedIndex.value <= -0.18;
    },
    isNeedRefresh => {
      if (isNeedRefresh) {
        runOnJS(hapticOnRefresh)();
      }
    },
    [animatedIndex],
  );

  useAnimatedReaction(
    () => {
      return animatedIndex.value <= -0.05 && animatedIndex.value >= -0.1;
    },
    reset => {
      if (reset) {
        runOnJS(resetHapticOnRefresh)();
      }
    },
    [animatedIndex],
  );

  const activeTab = useSelector(activeTabSelector);
  useEffect(() => {
    if (activeTab === 'team') {
      onRefresh();
    }
  }, [activeTab, onRefresh]);

  return {onRefresh, refreshing};
};
