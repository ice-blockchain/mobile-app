// SPDX-License-Identifier: ice License 1.0

import {LinesBackground} from '@components/LinesBackground';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {SegmentedGraphs} from '@screens/HomeFlow/Stats/components/SegmentedGraphs';
import {Summary} from '@screens/HomeFlow/Stats/components/Summary';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

export const Stats = memo(() => {
  useFocusStatusBar({style: 'light-content'});

  const tabbarOffset = useBottomTabBarOffsetStyle();

  return (
    <View style={styles.container}>
      <LinesBackground />
      <Header
        color={COLORS.white}
        title={t('stats.header_title')}
        backgroundColor={'transparent'}
      />
      <Summary />
      <View style={[commonStyles.baseSubScreen, tabbarOffset.current]}>
        <SegmentedGraphs />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
  },
});
