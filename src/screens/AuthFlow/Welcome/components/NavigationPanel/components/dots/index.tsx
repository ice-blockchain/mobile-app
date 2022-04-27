import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import Dot from './dot';

interface DotsProps {
  amount: number;
  activeIndex: number;
}

const Dots = ({amount, activeIndex}: DotsProps) => {
  const dots = useRef(new Array(amount).fill('')).current;
  return (
    <View style={styles.container}>
      {dots.map((_, index) => (
        <Dot key={`${index}-dot`} isActive={index === activeIndex} />
      ))}
    </View>
  );
};

export default Dots;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
