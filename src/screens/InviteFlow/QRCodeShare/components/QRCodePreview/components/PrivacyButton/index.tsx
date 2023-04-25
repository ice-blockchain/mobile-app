// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {ClosedPrivacyIcon} from '@svg/ClosedPrivacyIcon';
import {OpenedPrivacyIcon} from '@svg/OpenedPrivacyIcon';
import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

const SIZE = rem(24);

type Props = {
  onPress: () => void;
  isClosed: boolean;
  style?: StyleProp<ViewStyle>;
};

export const PrivacyButton = ({onPress, isClosed, style}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Touchable onPress={onPress} hitSlop={SMALL_BUTTON_HIT_SLOP}>
        {isClosed ? (
          <ClosedPrivacyIcon
            width={rem(15)}
            height={rem(15)}
            color={COLORS.primaryDark}
          />
        ) : (
          <OpenedPrivacyIcon
            width={rem(15)}
            height={rem(15)}
            color={COLORS.primaryDark}
          />
        )}
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    bottom: -rem(6),
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.foam,
  },
});
