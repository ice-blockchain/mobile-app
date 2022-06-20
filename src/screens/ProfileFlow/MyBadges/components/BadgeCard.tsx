// SPDX-License-Identifier: BUSL-1.1

import {ImageCardCompact} from '@components/Cards/ImageCardCompact';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {BadgeProgress} from '@screens/ProfileFlow/MyBadges/components/BadgeCardProgress';
import React from 'react';
import {ImageSourcePropType, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  title: string;
  description: string;
  progress: number;
  active?: boolean;
  imageSource: ImageSourcePropType;
  connector: {
    top?: string | null;
    bottom?: string | null;
  };
};

export const BadgeCard = ({
  title,
  description,
  imageSource,
  progress,
  active = true,
  connector = {},
}: Props) => {
  return (
    <>
      {connector.top && (
        <View
          style={[
            styles.connector,
            styles.connectorTop,
            {backgroundColor: connector.top},
          ]}
        />
      )}
      {connector.bottom && (
        <View
          style={[
            styles.connector,
            styles.connectorBottom,
            {backgroundColor: connector.bottom},
          ]}
        />
      )}
      <ImageCardCompact
        title={title}
        description={description}
        imageSource={imageSource}
        renderBody={() => <BadgeProgress value={progress} />}
        containerStyle={[
          active ? styles.containerActive : styles.containerInactive,
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  containerActive: {
    marginVertical: rem(12),
  },
  containerInactive: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  connector: {
    position: 'absolute',
    width: 1,
    left: SCREEN_SIDE_OFFSET + rem(35),
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
