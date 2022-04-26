import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

interface ButtonProps {
  onPress: () => void;
  text: string;
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element;
}

const Button = ({onPress, text, rightIcon, leftIcon}: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {leftIcon || null}
      <Text style={styles.text}>{text}</Text>
      {rightIcon || null}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#073e91',
    borderRadius: 11,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  text: {
    color: '#FFF',
    fontSize: 14,
    paddingHorizontal: 4,
  },
});
