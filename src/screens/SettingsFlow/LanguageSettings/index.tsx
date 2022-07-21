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
import {useConfirmChangeLangDlg} from '@screens/SettingsFlow/LanguageSettings/hooks/useConfirmChangeLangDlg';
import {DeviceActions} from '@store/modules/Devices/actions';
import {deviceSettingsSelector} from '@store/modules/Devices/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {availableLocales, t} from '@translations/i18n';
import {noop} from 'lodash';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const LanguageSettings = () => {
  useFocusStatusBar({style: 'dark-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const {scrollHandler, shadowStyle} = useScrollShadow();
  const deviceSettings = useSelector(deviceSettingsSelector);

  const {openConfirmationDlg} = useConfirmChangeLangDlg();

  const isLoading = useSelector(
    isLoadingSelector.bind(null, DeviceActions.UPDATE_SETTINGS),
  );

  const renderLanguageListItem = (language: string, index: number) => {
    const isSelected =
      deviceSettings?.language.toLowerCase() === language.toLowerCase();
    return (
      <React.Fragment key={language}>
        {index !== 0 && <LanguageListItemSeparator />}
        <LanguageListItem
          selected={isSelected}
          language={language}
          onSelect={isSelected ? noop : openConfirmationDlg}
          loading={isLoading}
        />
      </React.Fragment>
    );
  };

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
          {availableLocales.map(renderLanguageListItem)}
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
