// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {EarningsCell} from '@screens/Team/components/Header/components/Info/components/EarningsCell';
import {ReferralsCell} from '@screens/Team/components/Header/components/Info/components/ReferralsCell';
import {useEarningsWalkthrough} from '@screens/Team/components/Header/components/Info/hooks/useEarningsWalkthrough';
import {useReferralsWalkthrough} from '@screens/Team/components/Header/components/Info/hooks/useReferralsWalkthrough';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const INFO_HEIGHT = rem(84);

export const Info = () => {
  const {
    elementRef: referralElementRef,
    onElementLayout: onReferralElementLayout,
  } = useReferralsWalkthrough();
  const {
    elementRef: earningsElementRef,
    onElementLayout: onEarningsElementLayout,
  } = useEarningsWalkthrough();

  return (
    <View style={styles.container}>
      <View
        style={styles.cellWrapper}
        ref={referralElementRef}
        onLayout={onReferralElementLayout}>
        <ReferralsCell />
      </View>
      <View style={styles.divider} />
      <View
        style={styles.cellWrapper}
        ref={earningsElementRef}
        onLayout={onEarningsElementLayout}>
        <EarningsCell />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: INFO_HEIGHT,
  },
  cellWrapper: {
    flex: 1,
  },
  divider: {
    width: 1,
    backgroundColor: COLORS.white,
    height: rem(22),
  },
});
