// SPDX-License-Identifier: BUSL-1.1

import {IconCard} from '@components/Cards/IconCard';
import {BadgeProgress} from '@screens/ProfileFlow/MyBadges/components/BadgeCardProgress';
import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

type Props = {
  title: string;
  description: string;
  progress: number;
  active?: boolean;
  renderIcon: (props: SvgProps) => ReactNode;
};

export const BadgeCard = ({
  title,
  description,
  renderIcon,
  progress,
  active = true,
}: Props) => {
  return (
    <IconCard
      title={title}
      description={description}
      renderIcon={renderIcon}
      renderBody={() => <BadgeProgress value={progress} />}
      containerStyle={[
        styles.container,
        active ? styles.containerActive : styles.containerInactive,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  containerInactive: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
    marginBottom: rem(0),
  },
  containerActive: {
    marginBottom: rem(22),
  },
});
