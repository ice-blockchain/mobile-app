// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {
  CARD_WIDTH,
  CARDS_TOTAL_HEIGHT,
} from '@screens/HomeFlow/Home/components/Overview/components/CardBase';
import {LevelCard} from '@screens/HomeFlow/Home/components/Overview/components/LevelCard';
import {useSetWalkthroughElementData} from '@store/modules/Walkthrough/hooks/useSetWalkthroughElementData';
import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';

export const useProfileCardWalkthrough = () => {
  const profileCardRef = useRef<View>(null);

  const {setWalkthroughElementData} = useSetWalkthroughElementData();
  const sharedIsCollapsed = useSharedValue(0);

  const onProfileCardLayout = () => {
    setWalkthroughElementData({
      stepKey: 'profileCard',
      elementData: {
        getRef: () => profileCardRef,
        getTop: measurements => measurements.pageY - SCREEN_SIDE_OFFSET * 2,
        render: () => {
          return (
            <View style={styles.outerContainer}>
              <View style={styles.container}>
                <View style={styles.mainContainer}>
                  <LevelCard sharedIsCollapsed={sharedIsCollapsed} />
                </View>
              </View>
            </View>
          );
        },
      },
    });
  };

  return {
    onProfileCardLayout,
    profileCardRef,
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    width: CARD_WIDTH,
    height: CARDS_TOTAL_HEIGHT,
    marginLeft: SCREEN_SIDE_OFFSET,
  },
  container: {
    borderRadius: 30,
    backgroundColor: COLORS.white,
    padding: SCREEN_SIDE_OFFSET,
    paddingLeft: 0,
    width: CARD_WIDTH + SCREEN_SIDE_OFFSET * 2,
    height: CARDS_TOTAL_HEIGHT + SCREEN_SIDE_OFFSET * 2,
  },
  outerContainer: {
    borderRadius: 30,
    backgroundColor: COLORS.white02opacity,
    padding: SCREEN_SIDE_OFFSET,
    width: CARD_WIDTH + SCREEN_SIDE_OFFSET * 4,
    height: CARDS_TOTAL_HEIGHT + SCREEN_SIDE_OFFSET * 4,
    marginLeft: -SCREEN_SIDE_OFFSET,
  },
});
