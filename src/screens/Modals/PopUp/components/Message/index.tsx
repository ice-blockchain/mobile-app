// SPDX-License-Identifier: ice License 1.0

import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  text: string | ReactNode;
};

export const Message = ({text}: Props) => {
  return <Text style={styles.messageText}>{text}</Text>;
};

const styles = StyleSheet.create({
  messageText: {
    ...font(14, 20, 'medium', 'secondary', 'center'),
    marginTop: rem(16),
    marginHorizontal: rem(30),
  },
});
