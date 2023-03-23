// SPDX-License-Identifier: ice License 1.0

import {TeamActiveIcon} from '@svg/TeamActiveIcon';
import {TeamInactiveIcon} from '@svg/TeamInactiveIcon';
import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  focused: boolean;
};

export const TeamIcon = ({focused}: Props) => {
  return focused ? (
    <TeamActiveIcon style={styles.icon} width={rem(40)} height={rem(40)} />
  ) : (
    <TeamInactiveIcon style={styles.icon} width={rem(40)} height={rem(40)} />
  );
};

const styles = StyleSheet.create({
  icon: {marginLeft: rem(26)},
});
