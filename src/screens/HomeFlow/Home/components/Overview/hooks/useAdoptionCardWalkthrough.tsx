// SPDX-License-Identifier: ice License 1.0

import {FlipCard, FlipCardMethods} from '@components/FlipCard';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {AdoptionCard} from '@screens/HomeFlow/Home/components/Overview/components/AdoptionCard';
import {
  CARD_MARGIN_RIGHT_WIDTH,
  CARD_WIDTH,
  CARDS_TOTAL_HEIGHT,
} from '@screens/HomeFlow/Home/components/Overview/components/CardBase';
import {OnlineUsersHistory} from '@screens/HomeFlow/Home/components/Overview/components/OnlineUsersHistory';
import {useSetWalkthroughElementData} from '@store/modules/Walkthrough/hooks/useSetWalkthroughElementData';
import {TapIcon} from '@svg/TapIcon';
import {mirrorTransform} from '@utils/styles';
import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {rem} from 'rn-units';

function AdoptionCardWalkthroughElement() {
  const adoptionCardRef = useRef<FlipCardMethods>(null);
  const handleAdoptionPress = () => {
    adoptionCardRef.current?.changeSide();
  };
  const sharedIsCollapsed = useSharedValue(0);
  return (
    <FlipCard
      disabled={false}
      stylesContainer={styles.mainContainer}
      front={
        <AdoptionCard
          sharedIsCollapsed={sharedIsCollapsed}
          onPress={handleAdoptionPress}
        />
      }
      back={<OnlineUsersHistory sharedIsCollapsed={sharedIsCollapsed} />}
      ref={adoptionCardRef}
    />
  );
}

export const useAdoptionCardWalkthrough = () => {
  const adoptionCardRef = useRef<View>(null);

  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const onAdoptionCardLayout = () => {
    setWalkthroughElementData({
      stepKey: 'adoptionCard',
      elementData: {
        getRef: () => adoptionCardRef,
        getTop: measurements => measurements.pageY - SCREEN_SIDE_OFFSET * 2,
        render: () => {
          return (
            <View style={styles.outerContainer}>
              <View style={styles.container}>
                <AdoptionCardWalkthroughElement />
                <View style={styles.tapIconContainer} pointerEvents={'none'}>
                  <TapIcon pointerEvents={'none'} color={COLORS.white} />
                </View>
              </View>
            </View>
          );
        },
      },
    });
  };

  return {
    onAdoptionCardLayout,
    adoptionCardRef,
  };
};

const styles = StyleSheet.create({
  tapIconContainer: {
    position: 'absolute',
    right: SCREEN_SIDE_OFFSET + rem(12),
    bottom: SCREEN_SIDE_OFFSET + rem(12),
    ...mirrorTransform(),
  },
  mainContainer: {
    width: CARD_WIDTH,
    height: CARDS_TOTAL_HEIGHT,
  },
  container: {
    borderRadius: 30,
    backgroundColor: COLORS.white,
    padding: SCREEN_SIDE_OFFSET,
    width: CARD_WIDTH + SCREEN_SIDE_OFFSET * 2,
    height: CARDS_TOTAL_HEIGHT + SCREEN_SIDE_OFFSET * 2,
  },
  outerContainer: {
    borderRadius: 30,
    backgroundColor: COLORS.white02opacity,
    padding: SCREEN_SIDE_OFFSET,
    width: CARD_WIDTH + SCREEN_SIDE_OFFSET * 4,
    height: CARDS_TOTAL_HEIGHT + SCREEN_SIDE_OFFSET * 4,
    marginLeft: CARD_MARGIN_RIGHT_WIDTH * 3,
  },
});
