// SPDX-License-Identifier: ice License 1.0

import {SearchInput} from '@components/Inputs/SearchInput';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {CHAT_TAB_BAR_PADDING} from '@navigation/components/ChatTabBar';
import {SEARCH_MARGIN_VERTICAL} from '@screens/ChatFlow/ChatList/constants';
import {t} from '@translations/i18n';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  onChangeText: (newText: string) => void;
};

export function SearchBar({onChangeText}: Props) {
  return (
    <View style={[styles.searchContainer, commonStyles.shadow]}>
      <SearchInput
        onChangeText={onChangeText}
        placeholder={t('button.search')}
        containerStyle={styles.search}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.secondaryFaint,
    backgroundColor: COLORS.white,
  },
  search: {
    marginVertical: SEARCH_MARGIN_VERTICAL,
    marginHorizontal: CHAT_TAB_BAR_PADDING,
  },
});
