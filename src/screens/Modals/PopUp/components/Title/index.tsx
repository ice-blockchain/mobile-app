// SPDX-License-Identifier: ice License 1.0

import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  text: string | ReactNode;
};

export const Title = ({text}: Props) => {
  return <Text style={styles.titleText}>{text}</Text>;
};

const styles = StyleSheet.create({
  titleText: {
    marginHorizontal: rem(12),
    ...font(24, 29, 'black', 'primaryDark', 'center'),
  },
});
