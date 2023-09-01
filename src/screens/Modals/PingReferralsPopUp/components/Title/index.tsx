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
    marginLeft: rem(16),
    marginRight: rem(44),
    ...font(24, 31, 'black', 'primaryDark', 'left'),
  },
});
