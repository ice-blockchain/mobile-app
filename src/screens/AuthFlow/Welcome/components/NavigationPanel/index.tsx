// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {rem} from 'rn-units';
import Dots from './components/dots';
import NotNowButton from './components/NotNowButton';
import Button from './components/Button';
import NextArrowSvg from '@svg/nextArrow';
import {translate} from '@utils/i18n';

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
            text={translate('global.next_btn')}
            rightIcon={<NextArrowSvg />}
          />
        ) : (
          <Button onPress={yesPleasePress} text={translate('global.yes_btn')} />
        )}
      </View>
    </View>
  );
};

export default NavigationPanel;

const styles = StyleSheet.create({
  navigationPanel: {
    paddingHorizontal: rem(64),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenElement: {
    opacity: 0,
  },
  wrapper: {alignItems: 'center'},
});
