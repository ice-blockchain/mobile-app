// SPDX-License-Identifier: BUSL-1.1

import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

import {Dot} from './dot';

interface DotsProps {
  amount: number;
  activeIndex: number;
  withError?: boolean;
}

export const Dots = ({amount, activeIndex, withError}: DotsProps) => {
  const dots = useRef(new Array(amount).fill('')).current;
  return (
    <View style={styles.container}>
      {dots.map((_, index) => (
        <Dot
          key={`${index}-dot`}
          isActive={index === activeIndex}
          withError={withError}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: rem(60),
  },
});
