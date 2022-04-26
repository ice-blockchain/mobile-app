import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';

import {COLORS} from '@constants/colors';
interface DotsProps {
  amount: number;
  activeIndex: number;
}

const Dots = ({amount, activeIndex}: DotsProps) => {
  const dots = useRef(new Array(amount).fill('')).current;
  return (
    <View style={styles.container}>
      {dots.map((_, index) => (
        <View
          key={`${index}-dot`}
          style={[styles.dot, index === activeIndex ? styles.activeDot : null]}
        />
      ))}
    </View>
  );
};

export default Dots;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 4,
    marginRight: 3,
    backgroundColor: COLORS.greyText,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
  },
});
