// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {InfoOutlineIcon} from '@svg/InfoOutlineIcon';
import React from 'react';
import {rem} from 'rn-units/index';

export const BALANCE_HISTORY_ICON_SIZE = rem(16);

export function BalanceHistoryButton() {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();
  return (
    <Touchable
      hitSlop={SMALL_BUTTON_HIT_SLOP}
      onPress={() => navigation.navigate('BalanceHistory')}>
      <InfoOutlineIcon
        color={COLORS.shamrock}
        width={BALANCE_HISTORY_ICON_SIZE}
        height={BALANCE_HISTORY_ICON_SIZE}
      />
    </Touchable>
  );
}
