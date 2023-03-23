// SPDX-License-Identifier: ice License 1.0

import {BadgeType} from '@api/achievements/types';
import {ImageCardCompact} from '@components/Cards/ImageCardCompact';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Images} from '@images';
import {BadgeProgress} from '@screens/ProfileFlow/Badges/components/BadgeCardProgress';
import {t} from '@translations/i18n';
import {thousandsSeparator} from '@utils/numbers';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

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

  if (type === 'level') {
    if (achievingRange.fromInclusive && achievingRange.toInclusive) {
      description = `${t(`profile.badge_types.${type}.description`)} ${
        achievingRange.fromInclusive
      }-${achievingRange.toInclusive}`;
    }
    if (!achievingRange?.toInclusive && achievingRange?.fromInclusive) {
      description = `${t(`profile.badge_types.${type}.description`)} ${
        achievingRange?.fromInclusive - 1
      }+`;
    }
    if (!achievingRange?.fromInclusive && achievingRange?.toInclusive) {
      description = `${t(`profile.badge_types.${type}.description`)} < ${
        achievingRange?.toInclusive + 1
      } `;
    }
  } else if (type === 'coin') {
    if (achievingRange.fromInclusive && achievingRange.toInclusive) {
      description = `${thousandsSeparator(
        achievingRange.fromInclusive,
      )}-${thousandsSeparator(achievingRange.toInclusive)} ${t(
        `profile.badge_types.${type}.description`,
      )}`;
    }
    if (!achievingRange?.toInclusive && achievingRange?.fromInclusive) {
      description = `${thousandsSeparator(
        achievingRange?.fromInclusive - 1,
      )}+ ${t(`profile.badge_types.${type}.description`)}`;
    }
    if (!achievingRange?.fromInclusive && achievingRange?.toInclusive) {
      description = `< ${thousandsSeparator(
        achievingRange?.toInclusive + 1,
      )} ${t(`profile.badge_types.${type}.description`)}`;
    }
  } else {
    if (achievingRange.fromInclusive && achievingRange.toInclusive) {
      description = `${achievingRange.fromInclusive}-${
        achievingRange.toInclusive
      } ${t(`profile.badge_types.${type}.description`)}`;
    }
    if (!achievingRange?.toInclusive && achievingRange?.fromInclusive) {
      // TODO: check plus
      description = `${achievingRange?.fromInclusive - 1}+ ${t(
        `profile.badge_types.${type}.description`,
      )}`;
    }
    if (!achievingRange?.fromInclusive && achievingRange?.toInclusive) {
      description = `< ${achievingRange?.toInclusive + 1} ${t(
        `profile.badge_types.${type}.description`,
      )}`;
    }
  }

  const image = Images.badges[imagePath];

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
        renderBody={() => <BadgeProgress value={percentageOfUsersInProgress} />}
        containerStyle={styles.containerActive}
      />
    </>
  );
};

const styles = StyleSheet.create({
  containerActive: {
    marginTop: rem(19),
    marginBottom: rem(20),
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
