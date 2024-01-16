// SPDX-License-Identifier: ice License 1.0

import {LinesBackground} from '@components/LinesBackground';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {useIsTabNavigation} from '@navigation/hooks/useIsTabNavigation';
import {SegmentedGraphs} from '@screens/HomeFlow/Stats/components/SegmentedGraphs';
import {Summary} from '@screens/HomeFlow/Stats/components/Summary';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

export const Stats = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const isTabNavigation = useIsTabNavigation();
  return (
    <View style={styles.container}>
      <LinesBackground />
      <Header
        color={COLORS.white}
        title={t('stats.header_title')}
        backgroundColor={'transparent'}
        showBackButton={!isTabNavigation}
      />
      <Summary />
      <View style={commonStyles.baseSubScreen}>
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
