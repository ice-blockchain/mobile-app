// SPDX-License-Identifier: BUSL-1.1

import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {
  BadgeCard,
  BadgeCardSkeleton,
  CARD_OFFSET,
} from '@screens/Profile/components/Badges/components/BadgeCard';
import {IceBreaker} from '@svg/Badges/IceBreaker';
import React, {useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Badge = number;

type Props = {
  loading: boolean;
  data: Badge[];
};

const NUMBER_OF_SKELETONS = 5;

export const BadgeList = ({loading, data}: Props) => {
  const renderItem = useCallback(({item}: {item: Badge | null}) => {
    if (item === null) {
      return <BadgeCardSkeleton />;
    }

    return (
      <BadgeCard
        renderIcon={IceBreaker}
        title={'Ice Breaker'}
        category={'Social'}
        progressText={'2 of 5'}
        progressValue={60}
      />
    );
  }, []);
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
    marginTop: rem(4),
  },
  listContent: {
    paddingHorizontal: SCREEN_SIDE_OFFSET - CARD_OFFSET,
  },
});
