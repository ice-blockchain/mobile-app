// SPDX-License-Identifier: ice License 1.0

import {BadgeType} from '@api/achievements/types';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Images} from '@images';
import {BadgeProgress} from '@screens/ProfileFlow/Badges/components/BadgeCardProgress';
import {ImageCardCompact} from '@screens/ProfileFlow/Badges/components/ImageCardCompact';
import {t} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {rem} from 'rn-units';

const BADGE_VERTICAL_MARGIN = rem(19);
const BADGE_CELL_HEIGHT = rem(68);

type Props = {
  name: string;
  type: BadgeType;
  achieved: boolean;
  percentageOfUsersInProgress: number;
  achievingRange: {
    fromInclusive?: number;
    toInclusive?: number;
  };
  index: number;
  connector: {
    top?: boolean | null;
    bottom?: boolean | null;
  };
};

export const BadgeCard = ({
  name,
  index,
  type,
  achieved,
  percentageOfUsersInProgress,
  achievingRange,
  connector = {},
}: Props) => {
  const imagePath =
    `${type}${index}_achieved_${achieved}` as keyof typeof Images.badges;

  let description = '';

  if (achievingRange.fromInclusive && achievingRange.toInclusive) {
    if (type === 'level') {
      description = `${t(`profile.badge_types.${type}.description`)} ${
        achievingRange.fromInclusive
      }-${achievingRange.toInclusive}`;
    } else {
      description = `${achievingRange.fromInclusive}-${
        achievingRange.toInclusive
      } ${t(`profile.badge_types.${type}.description`)}`;
    }
  }
  if (!achievingRange?.toInclusive && achievingRange?.fromInclusive) {
    if (type === 'level') {
      description = `${t(`profile.badge_types.${type}.description`)} ${
        achievingRange?.fromInclusive - 1
      }+`;
    } else {
      description = `${achievingRange?.fromInclusive - 1}+ ${t(
        `profile.badge_types.${type}.description`,
      )}`;
    }
  }
  if (!achievingRange?.fromInclusive && achievingRange?.toInclusive) {
    if (type === 'level') {
      description = `${t(`profile.badge_types.${type}.description`)} < ${
        achievingRange?.toInclusive + 1
      }`;
    } else {
      description = `< ${achievingRange?.toInclusive + 1} ${t(
        `profile.badge_types.${type}.description`,
      )}`;
    }
  }

  const image = Images.badges[imagePath];

  const percentageProgress =
    percentageOfUsersInProgress > 100
      ? 100
      : formatNumber(percentageOfUsersInProgress, {
          maximumFractionDigits: 2,
        });

  return (
    <>
      {connector.top && (
        <View style={[styles.connector, styles.connectorTop]} />
      )}
      {connector.bottom && (
        <View style={[styles.connector, styles.connectorBottom]} />
      )}
      <ImageCardCompact
        title={name}
        description={description}
        image={image}
        renderBody={() => <BadgeProgress value={Number(percentageProgress)} />}
        containerStyle={styles.containerActive}
      />
    </>
  );
};

export const BadgeListSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={styles.skeleton} />
  </SkeletonPlaceholder>
);

const styles = StyleSheet.create({
  containerActive: {
    marginTop: rem(19),
    marginBottom: rem(20),
  },
  skeleton: {
    marginVertical: BADGE_VERTICAL_MARGIN,
    borderRadius: rem(16),
    height: BADGE_CELL_HEIGHT,
    marginHorizontal: SCREEN_SIDE_OFFSET,
    backgroundColor: 'green',
  },
  connector: {
    position: 'absolute',
    width: 1,
    left: SCREEN_SIDE_OFFSET + rem(48),
    backgroundColor: COLORS.shamrock,
  },
  connectorTop: {
    top: 0,
    bottom: '50%',
  },
  connectorBottom: {
    top: '50%',
    bottom: 0,
  },
});
