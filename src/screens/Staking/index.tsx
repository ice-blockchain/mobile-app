// SPDX-License-Identifier: ice License 1.0

import {LinesBackground} from '@components/LinesBackground';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {Calculator} from '@screens/Staking/components/Calculator';
import {Footer} from '@screens/Staking/components/Footer';
import {Intro} from '@screens/Staking/components/Intro';
import {usePreStakingCalculator} from '@screens/Staking/hooks/usePreStakingCalculator';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {rem} from 'rn-units';

export const Staking = memo(() => {
  useFocusStatusBar({style: 'light-content'});

  const safeAreaInsets = useSafeAreaInsets();

  const {scrollHandler, shadowStyle} = useScrollShadow();
  const {onParametersChange, parameters, calculatedResults} =
    usePreStakingCalculator();

  return (
    <View style={styles.container}>
      <LinesBackground />
      <Header
        color={COLORS.white}
        title={t('staking.title')}
        containerStyle={shadowStyle}
        backgroundColor={'transparent'}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: rem(16) + safeAreaInsets.bottom,
          },
        ]}>
        <Intro />
        <View style={[styles.card, commonStyles.baseSubScreen]}>
          <Calculator
            onParametersChange={onParametersChange}
            calculatedResults={calculatedResults}
          />
          <Footer
            parameters={parameters}
            calculatedResults={calculatedResults}
          />
        </View>
      </Animated.ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: rem(16),
  },
  card: {
    marginTop: rem(104),
    paddingBottom: 2000,
    marginBottom: -2000,
  },
});
