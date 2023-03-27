// SPDX-License-Identifier: ice License 1.0

import {BadgeSummary} from '@api/achievements/types';
import {User} from '@api/user/types';
import {COLORS} from '@constants/colors';
import {
  BadgeCard,
  BadgeCardSkeleton,
} from '@screens/ProfileFlow/Profile/components/Badges/components/BadgeCard';
import {isPrivacyInfoShownSelector} from '@store/modules/Account/selectors';
import React, {useCallback} from 'react';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  loading: boolean;
  data: BadgeSummary[];
  user?: User | null;
  isProfilePrivacyEditMode?: boolean;
  isOwner?: boolean;
};

const NUMBER_OF_SKELETONS = 5;
const NUMBER_OF_PLACEHOLDERS = 4;

export const BadgeSummariesList = ({
  loading,
  data,
  isProfilePrivacyEditMode,
  user,
  isOwner,
}: Props) => {
  const isPrivacyInfoShown = useSelector(isPrivacyInfoShownSelector);
  const hidden = isOwner
    ? user?.hiddenProfileElements?.includes('badges') && !isPrivacyInfoShown
    : user?.hiddenProfileElements?.includes('badges');

  const showPlaceholders =
    !isOwner && user?.hiddenProfileElements?.includes('badges');

  const badgeData =
    data.length === 0 ? Array(NUMBER_OF_SKELETONS).fill(null) : data;

  const badgesData = loading
    ? badgeData
    : hidden
    ? Array(NUMBER_OF_PLACEHOLDERS).fill(null)
    : badgeData;

  const renderItem: ListRenderItem<BadgeSummary> = useCallback(
    ({item, index}) => {
      if (!item || item === null) {
        if (showPlaceholders) {
          return (
            <BadgeCard
              style={index === 0 && styles.firstItem}
              index={index}
              hidden={true}
              isProfilePrivacyEditMode={false}
              isPlaceholder={true}
            />
          );
        } else {
          return <BadgeCardSkeleton />;
        }
      }
      return (
        <BadgeCard
          style={index === 0 && styles.firstItem}
          title={item.name}
          category={item.type}
          index={item.index}
          lastIndex={item.lastIndex}
          hidden={hidden}
          isProfilePrivacyEditMode={isProfilePrivacyEditMode}
        />
      );
    },
    [hidden, isProfilePrivacyEditMode, showPlaceholders],
  );

  return (
    <FlatList
      data={badgesData}
      renderItem={renderItem}
      horizontal={true}
      contentContainerStyle={styles.listContent}
      showsHorizontalScrollIndicator={false}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: rem(14),
    marginLeft: rem(12),
  },
  listContent: {
    paddingHorizontal: rem(10),
    paddingBottom: rem(10),
    backgroundColor: COLORS.white02opacity,
    borderTopLeftRadius: rem(20),
    borderBottomLeftRadius: rem(20),
  },
  firstItem: {
    marginLeft: 0, // margin 0 for the first item in the badges list
  },
});
