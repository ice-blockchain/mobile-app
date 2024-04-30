// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET, windowWidth} from '@constants/styles';
import {UserGreeting} from '@screens/HomeFlow/Home/components/Header/components/UserGreeting';
import {useSetWalkthroughElementData} from '@store/modules/Walkthrough/hooks/useSetWalkthroughElementData';
import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units/index';

const PADDING = rem(12);
const BORDER_RADIUS = 20;

export const useUserGreetingWalkthrough = () => {
  const elementRef = useRef<View>(null);

  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const onElementLayout = () => {
    setWalkthroughElementData({
      stepKey: 'nickname',
      elementData: {
        getRef: () => elementRef,
        getTop: measurements => measurements.pageY - PADDING * 2,
        render: () => {
          return (
            <View style={styles.container}>
              <View style={styles.mainContainer}>
                <UserGreeting disabled={true} />
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
  mainContainer: {
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: PADDING,
    width: windowWidth / 2,
  },
  container: {
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white02opacity,
    padding: PADDING,
    width: windowWidth / 2 + PADDING * 2,
    marginLeft: SCREEN_SIDE_OFFSET - PADDING * 2,
  },
});
