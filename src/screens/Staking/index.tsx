// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {Footer} from '@screens/Staking/components/Footer';
import {Intro} from '@screens/Staking/components/Intro';
import {StakingCalculator} from '@screens/Staking/components/StakingCalculator';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {rem} from 'rn-units';

export const Staking = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const {scrollHandler, shadowStyle} = useScrollShadow();

  return (
    <View style={styles.container}>
      <Header color={COLORS.white} containerStyle={shadowStyle} />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <Intro />
        <View style={styles.card}>
          <StakingCalculator />
          <Footer />
        </View>
      </Animated.ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.persianBlue,
  },
  card: {
    marginTop: rem(110),
    paddingBottom: 2000,
    marginBottom: -2000,
    backgroundColor: COLORS.white,
  },
});
