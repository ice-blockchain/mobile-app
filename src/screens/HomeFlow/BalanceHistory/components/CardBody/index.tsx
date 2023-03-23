// SPDX-License-Identifier: ice License 1.0

import {commonStyles} from '@constants/styles';
import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  children: ReactNode;
};

export const CARD_BODY_TOP_OFFSET = rem(62);

export const CardBody = ({children}: Props) => {
  return (
    <View style={[styles.card, commonStyles.baseSubScreen]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: CARD_BODY_TOP_OFFSET,
  },
});
