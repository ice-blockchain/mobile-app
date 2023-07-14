// SPDX-License-Identifier: ice License 1.0

import {BadgeType} from '@api/achievements/types';
import {InviteButton} from '@components/Buttons/InviteButton';
import {
  SegmentedControl,
  SegmentedControlMethods,
} from '@components/SegmentedControl';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {FaqButton} from '@navigation/components/Header/components/FaqButton';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {ProfileTabStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import {BadgeList} from '@screens/ProfileFlow/Badges/components/BadgeList';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {AchievementsSelectors} from '@store/modules/Achievements/selectors';
import {t} from '@translations/i18n';
import {capitalizeFirstLetter} from '@utils/string';
import React, {useCallback, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

const NUMBER_OF_SKELETONS = 6;

export const CATEGORIES: ReadonlyArray<{text: string; key: BadgeType}> = [
  {text: capitalizeFirstLetter(t('global.social')), key: 'social'},
  {text: capitalizeFirstLetter(t('global.coin')), key: 'coin'},
  {text: capitalizeFirstLetter(t('global.level')), key: 'level'},
];

function getInitialIndex(category?: BadgeType) {
  const initialCategory = category ?? 'social';
  const initialIndex = CATEGORIES.findIndex(c => c.key === initialCategory);

  return initialIndex >= 0 ? initialIndex : 0;
}

export const Badges = () => {
  useFocusStatusBar({style: 'dark-content'});
  const dispatch = useDispatch();
  const bottomOffset = useBottomTabBarOffsetStyle();
  const route = useRoute<RouteProp<ProfileTabStackParamList, 'Badges'>>();

  const authUser = useSelector(unsafeUserSelector);
  const isOwner = !route.params?.userId || route.params.userId === authUser.id;
  const userId = isOwner ? authUser.id : route.params?.userId || '';

  const coinBadges = useSelector(
    AchievementsSelectors.getBadgesForType({userId, type: 'coin'}),
  );
  const levelBadges = useSelector(
    AchievementsSelectors.getBadgesForType({userId, type: 'level'}),
  );
  const socialBadges = useSelector(
    AchievementsSelectors.getBadgesForType({userId, type: 'social'}),
  );

  const initialIndex = getInitialIndex(route.params?.category);

  const {scrollHandler, shadowStyle} = useScrollShadow();
  const switcherRef = useRef<SegmentedControlMethods>(null);
  const pagerRef = useRef<PagerView>(null);

  const dataForType = useCallback(
    (type: BadgeType) => {
      switch (type) {
        case 'level':
          return levelBadges;

        case 'social':
          return socialBadges;

        case 'coin':
          return coinBadges;
      }
    },
    [coinBadges, levelBadges, socialBadges],
  );

  const onCategoryChange = useCallback((index: number) => {
    pagerRef.current?.setPage(index);
  }, []);

  const onPageChange = (event: PagerViewOnPageSelectedEvent) => {
    switcherRef.current?.changeSegment(event.nativeEvent.position);
  };

  useEffect(() => {
    dispatch(AchievementsActions.ALL_BADGES_LOAD.START.create(userId));
  }, [dispatch, userId]);

  return (
    <View style={styles.container} hitSlop={{left: -50}}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.primaryDark}
        backgroundColor={COLORS.white}
        renderRightButtons={FaqButton}
        title={
          isOwner ? t('profile.my_badges.title') : t('profile.badges.title')
        }
      />
      <SegmentedControl
        segments={CATEGORIES}
        ref={switcherRef}
        style={styles.categorySwitcher}
        onChange={onCategoryChange}
        initialIndex={initialIndex}
      />
      <PagerView
        initialPage={initialIndex}
        style={styles.container}
        ref={pagerRef}
        onPageSelected={onPageChange}>
        {CATEGORIES.map((category, index) => {
          const data = dataForType(category.key);
          return (
            <View key={index + 1} style={styles.container}>
              <BadgeList
                data={
                  data && data.length === 0
                    ? Array(NUMBER_OF_SKELETONS).fill(null)
                    : data
                }
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={bottomOffset.current}
                ListFooterComponent={
                  <View style={styles.inviteButton}>
                    <InviteButton />
                  </View>
                }
              />
            </View>
          );
        })}
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categorySwitcher: {
    marginTop: rem(17),
    marginBottom: rem(24),
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
  inviteButton: {
    marginTop: rem(8),
  },
});
