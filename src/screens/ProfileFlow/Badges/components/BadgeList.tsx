// SPDX-License-Identifier: ice License 1.0

import {Badge} from '@api/achievements/types';
import {
  BadgeCard,
  BadgeListSkeleton,
} from '@screens/ProfileFlow/Badges/components/BadgeCard';
import React, {useCallback} from 'react';
import {FlatListProps} from 'react-native';
import Animated from 'react-native-reanimated';

type Props = Omit<FlatListProps<Badge>, 'renderItem'>;

export const BadgeList = ({
  data,
  contentContainerStyle,
  ...restProps
}: Props) => {
  const renderItem = useCallback(
    ({item, index}: {item: Badge; index: number}) => {
      if (item === null) {
        return <BadgeListSkeleton />;
      } else {
        const nextBadge = data && index < data.length ? data[index + 1] : null;
        return (
          <BadgeCard
            {...item}
            connector={{
              top: index > 0,
              bottom: !!nextBadge,
            }}
            index={index}
          />
        );
      }
    },
    [data],
  );

  return (
    <Animated.FlatList
      {...restProps}
      data={data}
      renderItem={renderItem}
      contentContainerStyle={contentContainerStyle}
    />
  );
};
