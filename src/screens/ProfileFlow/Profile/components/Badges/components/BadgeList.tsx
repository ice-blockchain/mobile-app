// SPDX-License-Identifier: BUSL-1.1

import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {
  BadgeCard,
  BadgeCardSkeleton,
  CARD_OFFSET,
} from '@screens/ProfileFlow/Profile/components/Badges/components/BadgeCard';
import {BadgeCategory} from '@screens/ProfileFlow/Profile/components/Badges/mockData';
import React, {useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  loading: boolean;
  data: BadgeCategory[];
};

const NUMBER_OF_SKELETONS = 5;

export const BadgeList = ({loading, data}: Props) => {
  const renderItem = useCallback(({item}: {item: BadgeCategory | null}) => {
    if (item === null) {
      return <BadgeCardSkeleton />;
    }

    return (
      <BadgeCard
        imageSource={item.imageSource}
        title={item.title}
        category={item.category}
        progressText={item.progressText}
        progressValue={item.progressValue}
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
