// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {InfoOutlineIcon} from '@svg/InfoOutlineIcon';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  text: string | ReactNode;
};

export const Warning = ({text}: Props) => {
  return (
    <View style={styles.warning}>
      <InfoOutlineIcon
        color={COLORS.primaryLight}
        width={rem(13)}
        height={rem(13)}
      />
      <Text style={styles.warningText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  warning: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rem(30),
    marginBottom: rem(10),
    marginHorizontal: rem(30),
  },
  warningText: {
    ...font(15, 20, 'medium', 'primaryLight'),
    marginLeft: rem(8),
  },
});
