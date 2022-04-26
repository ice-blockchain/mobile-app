import * as React from 'react';
import {View, StyleSheet} from 'react-native';

import Button from './Button';
import Dots from './dots';
import NotNowButton from './NotNowButton';

import NextArrowSvg from '@svg/nextArrow';

interface NavigationPanelProps {
  amount: number;
  activeIndex: number;
  nextPress: () => void;
  notNowPress: () => void;
  yesPleasePress: () => void;
}

const NavigationPanel = ({
  amount,
  activeIndex,
  notNowPress,
  nextPress,
  yesPleasePress,
}: NavigationPanelProps) => {
  const isLastPage = activeIndex >= amount - 1;
  return (
    <View style={styles.navigationPanel}>
      <View style={styles.wrapper}>
        <Dots amount={amount} activeIndex={activeIndex} />
      </View>

      <View style={!isLastPage ? styles.hiddenElement : null}>
        <NotNowButton onPress={notNowPress} disabled={!isLastPage} />
      </View>

      <View style={styles.wrapper}>
        {!isLastPage ? (
          <Button
            onPress={nextPress}
            text={'Next'}
            rightIcon={<NextArrowSvg />}
          />
        ) : (
          <Button onPress={yesPleasePress} text={'Yes, please'} />
        )}
      </View>
    </View>
  );
};

export default NavigationPanel;

const styles = StyleSheet.create({
  navigationPanel: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenElement: {
    opacity: 0,
  },
  wrapper: {flex: 1, alignItems: 'center'},
});
