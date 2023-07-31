// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {ShowPrivacyActionButton} from '@navigation/components/Header/components/ShowPrivacyButton/components/ShowPrivacyActionButton';
import {useSetWalkthroughElementData} from '@store/modules/Walkthrough/hooks/useSetWalkthroughElementData';
import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units/index';

const OUTER_SIZE = rem(64);
const INNER_SIZE = rem(44);

export const useProfileWalkthrough = () => {
  const elementRef = useRef<View>(null);

  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const onElementLayout = () => {
    setWalkthroughElementData({
      stepKey: 'profileHiddenData',
      elementData: {
        getRef: () => elementRef,
        getTop: measurements => measurements.pageY - rem(16),
        render: ({measurements}) => (
          <View
            style={[
              styles.outerContainer,
              {
                transform: [
                  {
                    translateX:
                      measurements.pageX -
                      (OUTER_SIZE - measurements.width) / 2,
                  },
                  {
                    translateY: -rem(4),
                  },
                ],
              },
            ]}>
            <ShowPrivacyActionButton
              style={styles.innerContainer}
              color={COLORS.primaryDark}
            />
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
    justifyContent: 'center',
    alignItems: 'center',
    width: OUTER_SIZE,
    height: OUTER_SIZE,
    borderRadius: OUTER_SIZE / 2,
    backgroundColor: COLORS.white02opacity,
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: INNER_SIZE,
    height: INNER_SIZE,
    borderRadius: INNER_SIZE / 2,
    backgroundColor: COLORS.white,
  },
});
