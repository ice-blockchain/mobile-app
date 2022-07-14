// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';

export const LanguageSettings = () => {
  useFocusStatusBar({style: 'dark-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const {scrollHandler, shadowStyle} = useScrollShadow();

  return (
    <View style={styles.container}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.darkBlue}
        backgroundColor={COLORS.white}
        title={t('settings.language_settings')}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, bottomOffset.current]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
