// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {windowWidth} from '@constants/styles';
import {
  BALANCE_HISTORY_ICON_SIZE,
  BalanceHistoryButton,
} from '@screens/HomeFlow/Home/components/Pager/components/Wallet/components/BalanceHistoryButton';
import {useSetWalkthroughElementData} from '@store/modules/Walkthrough/hooks/useSetWalkthroughElementData';
import {isRTL} from '@translations/i18n';
import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units/index';

const PADDING = rem(12);

export const useBalanceHistoryWalkthrough = () => {
  const elementRef = useRef<View>(null);

  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const onElementLayout = () => {
    setWalkthroughElementData({
      stepKey: 'balanceHistory',
      elementData: {
        getRef: () => elementRef,
        getTop: measurements => measurements.pageY - PADDING,
        render: ({measurements}) => {
          return (
            <View
              style={[
                styles.container,
                {
                  marginLeft: isRTL
                    ? windowWidth - measurements.pageX - MAIN_CONTAINER_SIZE
                    : measurements.pageX - PADDING,
                },
              ]}>
              <View style={styles.mainContainer}>
                <BalanceHistoryButton />
              </View>
            </View>
          );
        },
      },
    });
  };

  return {
    onElementLayout,
    elementRef,
  };
};

const MAIN_CONTAINER_SIZE = BALANCE_HISTORY_ICON_SIZE + PADDING;
const CONTAINER_SIZE = MAIN_CONTAINER_SIZE + PADDING;

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: MAIN_CONTAINER_SIZE / 2,
    backgroundColor: COLORS.white,
    width: MAIN_CONTAINER_SIZE,
    height: MAIN_CONTAINER_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    borderRadius: CONTAINER_SIZE / 2,
    backgroundColor: COLORS.white02opacity,
    width: CONTAINER_SIZE,
    height: CONTAINER_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
