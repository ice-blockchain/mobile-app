// SPDX-License-Identifier: ice License 1.0

import {BadgeSummary} from '@api/achievements/types';
import {User} from '@api/user/types';
import {COLORS} from '@constants/colors';
import {
  BadgeCard,
  BadgeCardSkeleton,
} from '@screens/ProfileFlow/Profile/components/Badges/components/BadgeCard';
import {isPrivacyInfoShownSelector} from '@store/modules/Account/selectors';
import {t} from '@translations/i18n';
import React, {useCallback} from 'react';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  loading: boolean;
  data: BadgeSummary[];
  user?: User | null;
  isProfilePrivacyEditMode?: boolean;
};

const NUMBER_OF_SKELETONS = 5;

export const BadgeList = ({
  loading,
  data,
  isProfilePrivacyEditMode,
  user,
}: Props) => {
  const isPrivacyInfoShown = useSelector(isPrivacyInfoShownSelector);
  const hidden =
    user?.hiddenProfileElements?.includes('badges') && !isPrivacyInfoShown;

  const renderItem: ListRenderItem<BadgeSummary> = useCallback(
    ({item, index}) => {
      if (!item || item === null) {
        return <BadgeCardSkeleton />;
      }

      const value = item.index + 1;
      const total = item.lastIndex + 1;

      return (
        <BadgeCard
          style={index === 0 && styles.firstItem}
          title={item.name}
          category={item.type}
          progressText={t('profile.progress_text', {value, total})}
          progressValue={(value * 100) / total}
          hidden={hidden}
          isProfilePrivacyEditMode={isProfilePrivacyEditMode}
        />
      );
    },
    [hidden, isProfilePrivacyEditMode],
  );

  return (
    <FlatList
      data={loading ? Array(NUMBER_OF_SKELETONS).fill(null) : data}
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
