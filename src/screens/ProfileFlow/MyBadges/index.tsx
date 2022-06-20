// SPDX-License-Identifier: BUSL-1.1

import {IconCard} from '@components/Cards/IconCard';
import {InviteButton} from '@components/InviteButton';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {FaqButton} from '@navigation/components/Header/components/FaqButton';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {BadgeProgress} from '@screens/ProfileFlow/MyBadges/components/BadgeProgress';
import {
  CATEGORIES,
  CategorySwitcher,
} from '@screens/ProfileFlow/MyBadges/components/CategorySwitcher';
import {IceBreaker} from '@svg/Badges/IceBreaker';
import {t} from '@utils/i18n';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {rem} from 'rn-units';

export const MyBadges = () => {
  useFocusStatusBar({style: 'dark-content'});
  const {scrollHandler, shadowStyle} = useScrollShadow();
  const onCategoryChange = (index: number) => {
    const category = CATEGORIES[index];
    console.log('%c index', 'background: #ff6347', category);
  };

  return (
    <View style={styles.container}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.darkBlue}
        backgroundColor={COLORS.white}
        renderRightButtons={FaqButton}
        title={t('my_badges.title')}
      />
      <CategorySwitcher
        style={styles.categorySwitcher}
        onChange={onCategoryChange}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <IconCard
          title="Ice Breaker"
          description="Below 3 ice friends"
          renderIcon={IceBreaker}
          renderBody={() => <BadgeProgress value={11.23} />}
          containerStyle={styles.card}
        />
        <IconCard
          title="Ice Breaker"
          description="Below 3 ice friends"
          renderIcon={IceBreaker}
          renderBody={() => <BadgeProgress value={11.23} />}
          containerStyle={styles.card}
        />
        <IconCard
          title="Ice Breaker"
          description="Below 3 ice friends"
          renderIcon={IceBreaker}
          renderBody={() => <BadgeProgress value={11.23} />}
          containerStyle={styles.card}
        />
        <InviteButton style={styles.inviteButton} />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categorySwitcher: {
    marginTop: rem(10),
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
  card: {
    marginVertical: rem(10),
  },
  inviteButton: {
    marginTop: rem(18),
  },
});
