// SPDX-License-Identifier: BUSL-1.1

import {InviteButton} from '@components/InviteButton';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {FaqButton} from '@navigation/components/Header/components/FaqButton';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {BadgeList} from '@screens/ProfileFlow/MyBadges/components/BadgeList';
import {
  BadgeCategory,
  CATEGORIES,
  CategorySwitcher,
} from '@screens/ProfileFlow/MyBadges/components/CategorySwitcher';
import {BADGES} from '@screens/ProfileFlow/MyBadges/mockData';
import {t} from '@utils/i18n';
import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const MyBadges = () => {
  useFocusStatusBar({style: 'dark-content'});
  const {scrollHandler, shadowStyle} = useScrollShadow();
  const [category, setCategory] = useState(BadgeCategory.social);
  const categoryBadges = BADGES[category];

  const onCategoryChange = useCallback((index: number) => {
    setCategory(CATEGORIES[index].key);
  }, []);

  const renderHeader = useCallback(
    () => (
      <CategorySwitcher
        style={styles.categorySwitcher}
        onChange={onCategoryChange}
      />
    ),
    [onCategoryChange],
  );

  const renderFooter = useCallback(() => {
    return (
      <View style={styles.inviteButton}>
        <InviteButton />
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.darkBlue}
        backgroundColor={COLORS.white}
        renderRightButtons={FaqButton}
        title={t('my_badges.title')}
      />
      <BadgeList
        data={categoryBadges}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categorySwitcher: {
    marginBottom: rem(30),
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
  inviteButton: {
    marginTop: rem(18),
  },
});
