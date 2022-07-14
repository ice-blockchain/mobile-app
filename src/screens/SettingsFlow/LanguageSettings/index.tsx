// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {
  LanguageListItem,
  LanguageListItemSeparator,
} from '@screens/SettingsFlow/LanguageSettings/components/LanguageListItem';
import {DeviceActions} from '@store/modules/Devices/actions';
import {deviceSettingsSelector} from '@store/modules/Devices/selectors';
import {availableLocales, t} from '@translations/i18n';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const LanguageSettings = () => {
  useFocusStatusBar({style: 'dark-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const {scrollHandler, shadowStyle} = useScrollShadow();
  const dispatch = useDispatch();
  const deviceSettings = useSelector(deviceSettingsSelector);

  const updateSettings = useCallback(
    language => {
      dispatch(DeviceActions.UPDATE_SETTINGS.START.create({language}));
    },
    [dispatch],
  );

  return (
    <View style={styles.container}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.darkBlue}
        backgroundColor={COLORS.white}
        title={t('settings.language_settings')}
      />
      <Animated.ScrollView
        contentContainerStyle={[commonStyles.shadow, bottomOffset.current]}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <View style={styles.listContent}>
          {availableLocales.map((language, index) => (
            <React.Fragment key={language}>
              {index !== 0 && <LanguageListItemSeparator />}
              <LanguageListItem
                selected={deviceSettings?.language === language}
                language={language}
                onSelect={updateSettings}
              />
            </React.Fragment>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    backgroundColor: COLORS.white,
    marginHorizontal: SCREEN_SIDE_OFFSET,
    borderRadius: rem(16),
    marginTop: rem(12),
  },
});
