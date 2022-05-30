// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {rem, isAndroid} from 'rn-units';
import {Dots} from './components/dots';
import {NotNowButton} from './components/NotNowButton';
import {Button} from './components/Button';
import {NextArrowSvg} from '@svg/NextArrow';
import {translate} from '@utils/i18n';

interface NavigationPanelProps {
  amount: number;
  activeIndex: number;
  nextPress: () => void;
  notNowPress?: () => void;
  yesPleasePress: () => void;
  withError?: boolean;
  lastPageButtonText?: string;
  isButtonActive?: boolean;
}

export const NavigationPanel = ({
  amount,
  activeIndex,
  notNowPress,
  nextPress,
  withError,
  yesPleasePress,
  lastPageButtonText = translate('button.yes_btn'),
  isButtonActive = true,
}: NavigationPanelProps) => {
  const isLastPage = activeIndex >= amount - 1;
  return (
    <View style={styles.navigationPanel}>
      <View style={styles.wrapper}>
        <Dots amount={amount} activeIndex={activeIndex} withError={withError} />
      </View>

      <View style={isLastPage && notNowPress ? null : styles.hiddenElement}>
        <NotNowButton onPress={notNowPress} disabled={!isLastPage} />
      </View>

      <View style={styles.wrapper}>
        {!isLastPage ? (
          <Button
            onPress={nextPress}
            text={translate('button.next_btn')}
            disabled={!isButtonActive}
            rightIcon={<NextArrowSvg />}
          />
        ) : (
          <Button
            onPress={yesPleasePress}
            text={lastPageButtonText}
            disabled={!isButtonActive}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationPanel: {
    paddingHorizontal: rem(64),
    marginBottom: isAndroid ? rem(10) : rem(4),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenElement: {
    opacity: 0,
  },
  wrapper: {alignItems: 'center'},
});
