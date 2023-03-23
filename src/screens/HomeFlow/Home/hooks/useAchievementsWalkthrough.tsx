// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {Tasks} from '@screens/HomeFlow/Home/components/Tasks';
import {ITEM_HEIGHT} from '@screens/HomeFlow/Home/components/Tasks/components/TaskItem';
import {useSetWalkthroughElementData} from '@store/modules/Walkthrough/hooks/useSetWalkthroughElementData';
import {TapIcon} from '@svg/TapIcon';
import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units/index';

const TAB_ICON_WIDTH = rem(64);
const TAB_ICON_HEIGHT = rem(56);

export const useAchievementsWalkthrough = () => {
  const elementRef = useRef<View>(null);

  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const onElementLayout = () => {
    setWalkthroughElementData({
      stepKey: 'achievements',
      elementData: {
        getRef: () => elementRef,
        getTop: measurements => measurements.pageY,
        render: () => {
          return (
            <View style={styles.mainContainer}>
              <Tasks highlightActiveTask />
              <View style={styles.tapIconContainer} pointerEvents={'none'}>
                <TapIcon
                  pointerEvents={'none'}
                  color={COLORS.primaryLight}
                  width={TAB_ICON_WIDTH}
                  height={TAB_ICON_HEIGHT}
                />
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

const styles = StyleSheet.create({
  tapIconContainer: {
    position: 'absolute',
    top: ITEM_HEIGHT * 3.5,
    right: rem(20),
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
  },
});
