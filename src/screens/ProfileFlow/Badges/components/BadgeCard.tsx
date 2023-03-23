// SPDX-License-Identifier: ice License 1.0

import {ImageCardCompact} from '@components/Cards/ImageCardCompact';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {BadgeProgress} from '@screens/ProfileFlow/Badges/components/BadgeCardProgress';
import React from 'react';
import {ImageSourcePropType, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  title: string;
  description: string;
  progressValue: number;
  active?: boolean;
  imageSource: ImageSourcePropType;
  connector: {
    top?: boolean | null;
    bottom?: boolean | null;
  };
};

export const BadgeCard = ({
  title,
  description,
  imageSource,
  progressValue,
  connector = {},
}: Props) => {
  return (
    <>
      {connector.top && (
        <View style={[styles.connector, styles.connectorTop]} />
      )}
      {connector.bottom && (
        <View style={[styles.connector, styles.connectorBottom]} />
      )}
      <ImageCardCompact
        title={title}
        description={description}
        imageSource={imageSource}
        renderBody={() => <BadgeProgress value={progressValue} />}
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
