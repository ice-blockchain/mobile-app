// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {BadgeCard} from '@screens/ProfileFlow/MyBadges/components/BadgeCard';
import {Badge} from '@screens/ProfileFlow/MyBadges/mockData';
import React, {useCallback} from 'react';
import {FlatListProps, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {rem} from 'rn-units';

type Props = Omit<FlatListProps<Badge>, 'renderItem'>;

export const BadgeList = (props: Props) => {
  const renderItem = useCallback(
    ({item, index}: {item: Badge; index: number}) => {
      const nextBadge =
        props.data && index < props.data.length ? props.data[index + 1] : null;
      return (
        <BadgeCard
          {...item}
          connector={{
            top:
              index > 0
                ? item.active
                  ? COLORS.shamrock
                  : COLORS.mischka
                : null,
            bottom: nextBadge
              ? nextBadge.active
                ? COLORS.shamrock
                : COLORS.mischka
              : null,
          }}
        />
      );
    },
    [props.data],
  );

  return (
    <Animated.FlatList
      {...props}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingTop: rem(10),
    paddingBottom: rem(40),
  },
});
