// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const SOCIAL_BUTTON_SIZE = rem(60);

export const SocialButton = ({
  onPress,
  Icon,
}: {
  onPress: () => void;
  Icon: React.FC<SvgProps>;
}) => {
  return (
    <Touchable style={styles.button} onPress={onPress}>
      <Icon width={rem(36)} height={rem(36)} />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: rem(12),
    justifyContent: 'center',
    alignItems: 'center',
    width: SOCIAL_BUTTON_SIZE,
    height: SOCIAL_BUTTON_SIZE,
    borderRadius: rem(12),
    borderWidth: rem(1),
    borderColor: COLORS.periwinkleGray,
  },
});
