// SPDX-License-Identifier: ice License 1.0

import {SectionHeader} from '@components/SectionHeader';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {t} from '@translations/i18n';
import React, {useCallback} from 'react';
import {ListRenderItem, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {rem} from 'rn-units';

import {SocialLinkItem} from './components/SocialLinkItem';
import {SOCIAL_LINKS, SocialLink} from './data';

export const SocialLinks = () => {
  const renderItem: ListRenderItem<SocialLink> = useCallback(
    ({item: {icon, linkScheme, linkUrl}}) => {
      return (
        <SocialLinkItem icon={icon} linkScheme={linkScheme} linkUrl={linkUrl} />
      );
    },
    [],
  );

  const renderSeparator = useCallback(
    () => <View style={styles.separator} />,
    [],
  );

  return (
    <>
      <SectionHeader
        style={styles.sectionHeader}
        title={t('home.socials.title')}
      />
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        horizontal
        data={SOCIAL_LINKS}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    paddingTop: rem(12),
  },
  separator: {
    width: rem(12),
  },
  contentContainerStyle: {
    paddingHorizontal: SCREEN_SIDE_OFFSET,
  },
});
