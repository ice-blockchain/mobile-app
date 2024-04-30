// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {ReferralsCell} from '@screens/Team/components/Header/components/Info/components/ReferralsCell';
import {useSetWalkthroughElementData} from '@store/modules/Walkthrough/hooks/useSetWalkthroughElementData';
import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

const CONTAINER_PADDING = rem(16);

export const useReferralsWalkthrough = () => {
  const elementRef = useRef<View>(null);

  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const onElementLayout = () => {
    setWalkthroughElementData({
      stepKey: 'referrals',
      elementData: {
        getRef: () => elementRef,
        getTop: measurements => {
          return measurements.pageY - CONTAINER_PADDING * 2;
        },
        render: ({measurements}) => (
          <View style={styles.outerContainer}>
            <View style={[styles.innerContainer, {width: measurements.width}]}>
              <ReferralsCell color={COLORS.primaryDark} />
            </View>
          </View>
        ),
      },
    });
  };

  return {
    onElementLayout,
    elementRef,
  };
};

const styles = StyleSheet.create({
  outerContainer: {
    alignSelf: 'flex-start',
    padding: CONTAINER_PADDING,
    justifyContent: 'center',
    borderRadius: rem(20),
    marginRight: -CONTAINER_PADDING / 2,
    backgroundColor: COLORS.white02opacity,
  },
  innerContainer: {
    borderRadius: rem(20),
    padding: CONTAINER_PADDING,
    backgroundColor: COLORS.white,
  },
});
