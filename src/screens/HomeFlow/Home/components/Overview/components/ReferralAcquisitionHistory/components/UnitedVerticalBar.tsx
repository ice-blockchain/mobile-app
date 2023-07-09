// SPDX-License-Identifier: ice License 1.0

import {VerticalBar} from '@components/BarGraph/components/VerticalBar';
import {COLORS} from '@constants/colors';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  valuePercentageB1: number;
  valuePercentageB2: number;
  label: string;
};

export const UnitedVerticalBar = ({
  valuePercentageB1,
  valuePercentageB2,
  label,
}: Props) => {
  return (
    <View>
      <View style={styles.container}>
        <VerticalBar
          valuePercentage={valuePercentageB2}
          showLabel={false}
          isUnited={true}
          barStyle={styles.whiteBar}
        />
        <VerticalBar
          valuePercentage={valuePercentageB1}
          showLabel={false}
          isUnited={true}
        />
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  label: {
    ...font(8, 9.6, 'medium', 'white', 'center'),
  },
  whiteBar: {
    backgroundColor: COLORS.white,
  },
});
