// SPDX-License-Identifier: ice License 1.0

import {SearchInput} from '@components/Inputs/SearchInput';
import {KeyboardAvoider} from '@components/KeyboardAvoider';
import {COLORS} from '@constants/colors';
import {Header} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {LanguageListItem} from '@screens/SettingsFlow/LanguageSettings/components/LanguageListItem';
import {useConfirmChangeLanguageDialog} from '@screens/SettingsFlow/LanguageSettings/hooks/useConfirmChangeLanguageDialog';
import {useLocaleSearch} from '@screens/SettingsFlow/LanguageSettings/hooks/useLocaleSearch';
import {AccountActions} from '@store/modules/Account/actions';
import {appLocaleSelector} from '@store/modules/Account/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {availableLocales, t} from '@translations/i18n';
import {SupportedLocale} from '@translations/localeConfig';
import {noop} from 'lodash';
import React, {useCallback} from 'react';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const LanguageSettings = () => {
  useFocusStatusBar({style: 'dark-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();

  const appLocale = useSelector(appLocaleSelector);

  const isLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const {locales, searchLocales} = useLocaleSearch(availableLocales);
  const {openConfirmationDialog} = useConfirmChangeLanguageDialog();

  const renderLanguageListItem: ListRenderItem<SupportedLocale> = useCallback(
    ({item: language}: {item: SupportedLocale}) => {
      const isSelected = appLocale.toLowerCase() === language.toLowerCase();

      return (
        <LanguageListItem
          key={language}
          selected={isSelected}
          language={language}
          onSelect={isSelected ? noop : openConfirmationDialog}
          loading={isLoading}
        />
      );
    },
    [appLocale, openConfirmationDialog, isLoading],
  );

  return (
    <KeyboardAvoider>
      <Header
        color={COLORS.primaryDark}
        backgroundColor={COLORS.white}
        title={t('settings.language_settings')}
      />
      <SearchInput
        onChangeText={searchLocales}
        placeholder={t('button.search')}
        containerStyle={styles.search}
      />
      <FlatList
        contentContainerStyle={bottomOffset.current}
        data={locales}
        renderItem={renderLanguageListItem}
        keyboardShouldPersistTaps={'handled'}
      />
    </KeyboardAvoider>
  );
};

const styles = StyleSheet.create({
  search: {
    marginHorizontal: rem(16),
    marginBottom: rem(10),
  },
});
