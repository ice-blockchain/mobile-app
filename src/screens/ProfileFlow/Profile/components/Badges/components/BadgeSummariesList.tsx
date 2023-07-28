// SPDX-License-Identifier: ice License 1.0

import {BadgeSummary} from '@api/achievements/types';
import {User} from '@api/user/types';
import {COLORS} from '@constants/colors';
import {
  BadgeCard,
  BadgeCardSkeleton,
} from '@screens/ProfileFlow/Profile/components/Badges/components/BadgeCard';
import {isPrivacyInfoShownSelector} from '@store/modules/Account/selectors';
import {isRTL} from '@translations/i18n';
import React, {useCallback, useMemo} from 'react';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {isAndroid, rem} from 'rn-units';

type Props = {
  loading: boolean;
  data: BadgeSummary[];
  user?: User | null;
  isProfilePrivacyEditMode?: boolean;
  isOwner?: boolean;
};

const NUMBER_OF_SKELETONS = 3;
const NUMBER_OF_PLACEHOLDERS = 3;

export const BadgeSummariesList = ({
  loading,
  data,
  isProfilePrivacyEditMode,
  user,
  isOwner,
}: Props) => {
  const isPrivacyInfoShown = useSelector(isPrivacyInfoShownSelector);
  const areBadgesHidden = user?.hiddenProfileElements?.includes('badges');
  const hidden = isOwner
    ? areBadgesHidden && !isPrivacyInfoShown
    : areBadgesHidden;

  const defaultData =
    data.length === 0 ? Array(NUMBER_OF_SKELETONS).fill(null) : data;

  const badgesData = useMemo(() => {
    if (loading) {
      return defaultData;
    }
    if (hidden) {
      return Array(NUMBER_OF_PLACEHOLDERS).fill(null);
    }
    return defaultData;
  }, [defaultData, hidden, loading]);

  const renderItem: ListRenderItem<BadgeSummary> = useCallback(
    ({item, index}) => {
      if (!item) {
        if (areBadgesHidden) {
          return (
            <BadgeCard
              style={index === 0 && styles.firstItem}
              index={index}
              hidden={true}
              isProfilePrivacyEditMode={isProfilePrivacyEditMode}
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
          userId={user?.id}
        />
      );
    },
    [areBadgesHidden, hidden, isProfilePrivacyEditMode, user?.id],
  );

  return (
    <FlatList
      data={badgesData}
      renderItem={renderItem}
      horizontal={true}
      contentContainerStyle={styles.listContent}
      showsHorizontalScrollIndicator={false}
      style={styles.list}
      inverted={isRTL && isAndroid}
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
    borderRadius: rem(20),
    flexDirection: isRTL && isAndroid ? 'row-reverse' : 'row',
  },
  firstItem: {
    marginLeft: 0, // margin 0 for the first item in the badges list
  },
});
