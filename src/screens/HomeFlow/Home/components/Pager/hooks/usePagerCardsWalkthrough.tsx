// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {Engagement} from '@screens/HomeFlow/Home/components/Pager/components/Engagement';
import {MiningRate} from '@screens/HomeFlow/Home/components/Pager/components/MiningRate';
import {Wallet} from '@screens/HomeFlow/Home/components/Pager/components/Wallet';
import {useSetWalkthroughElementData} from '@store/modules/Walkthrough/hooks/useSetWalkthroughElementData';
import {WalkthroughStepKey} from '@store/modules/Walkthrough/types';
import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

const OUTER_PADDING = rem(12);

const PAGER_CARDS_STEP_KEYS: WalkthroughStepKey[] = [
  'walletCard',
  'earningCard',
  'engagementCard',
];

function PagerCardWalkthroughElement({stepKey}: {stepKey: WalkthroughStepKey}) {
  switch (stepKey) {
    case 'walletCard':
      return <Wallet darkMode />;
    case 'earningCard':
      return <MiningRate darkMode />;
    case 'engagementCard':
      return <Engagement darkMode />;
    default:
      return null;
  }
}

export const usePagerCardsWalkthrough = () => {
  const elementRef = useRef<View>(null);

  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const onElementLayout = () => {
    PAGER_CARDS_STEP_KEYS.forEach(stepKey => {
      setWalkthroughElementData({
        stepKey,
        elementData: {
          getRef: () => elementRef,
          getTop: measurements => measurements.pageY - OUTER_PADDING,
          render: () => {
            return (
              <View style={styles.mainContainer}>
                <View style={styles.outerContainer}>
                  <View style={styles.container}>
                    <PagerCardWalkthroughElement stepKey={stepKey} />
                  </View>
                </View>
              </View>
            );
          },
        },
      });
    });
  };

  return {
    onElementLayout,
    elementRef,
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: rem(20),
  },
  outerContainer: {
    borderRadius: 30,
    padding: OUTER_PADDING,
    backgroundColor: COLORS.white02opacity,
  },
  container: {
    borderRadius: 30,
    backgroundColor: COLORS.white,
  },
});
