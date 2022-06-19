// SPDX-License-Identifier: BUSL-1.1

import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {
  BadgeCard,
  BadgeCardSkeleton,
  CARD_OFFSET,
} from '@screens/ProfileFlow/Profile/components/Badges/components/BadgeCard';
import {IceBreaker} from '@svg/Badges/IceBreaker';
import {SnowyPlow} from '@svg/Badges/SnowyPlow';
import {TroubleMaker} from '@svg/Badges/TroubleMaker';
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

    switch (item) {
      case 1: {
        return (
          <BadgeCard
            renderIcon={IceBreaker}
            title={'Ice Breaker'}
            category={'Social'}
            progressText={'2 of 5'}
            progressValue={60}
          />
        );
      }
      case 2: {
        return (
          <BadgeCard
            renderIcon={TroubleMaker}
            title={'Trouble Maker'}
            category={'Coins'}
            progressText={'3 of 16'}
            progressValue={20}
          />
        );
      }
      default: {
        return (
          <BadgeCard
            renderIcon={SnowyPlow}
            title={'Snowy Plow'}
            category={'Level'}
            progressText={'4 of 5'}
            progressValue={80}
          />
        );
      }
    }
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
