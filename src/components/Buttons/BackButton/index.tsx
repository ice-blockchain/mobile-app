// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {useTopOffsetStyle} from '@hooks/useTopOffsetStyle';
import {BackButtonIcon} from '@svg/BackButtonIcon';
import {mirrorTransform} from '@utils/styles';
import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onPress: () => void;
};

export const BackButton = ({onPress}: Props) => {
  const topOffset = useTopOffsetStyle();
  return (
    <Touchable
      onPress={onPress}
      hitSlop={MIDDLE_BUTTON_HIT_SLOP}
      style={[styles.backButton, topOffset.current]}>
      <BackButtonIcon color={COLORS.white} width={rem(16)} height={rem(14)} />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: rem(20),
    left: rem(20),
    ...mirrorTransform(),
  },
});
