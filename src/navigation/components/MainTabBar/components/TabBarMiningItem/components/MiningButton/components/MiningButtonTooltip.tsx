// SPDX-License-Identifier: ice License 1.0

import {Tooltip} from '@components/Tooltip';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {CloseIcon} from '@svg/CloseIcon';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

const CLOSE_BUTTON_SIZE = rem(20);

type Props = {
  label: string;
  onClose: () => void;
};

export const MiningButtonTooltip = ({label, onClose}: Props) => {
  return (
    <Tooltip
      animated={true}
      style={styles.container}
      chevronStyle={styles.chevron}>
      <Touchable
        style={styles.closeButton}
        onPress={onClose}
        hitSlop={SMALL_BUTTON_HIT_SLOP}>
        <CloseIcon width={rem(9)} height={rem(9)} color={COLORS.white} />
      </Touchable>
      <Text style={styles.tooltipText}>{label}</Text>
    </Tooltip>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.downriver,
    width: rem(200),
    minHeight: rem(50),
    paddingHorizontal: rem(12),
    paddingVertical: rem(11),
    borderRadius: rem(12),
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    bottom: rem(80),
  },
  tooltipText: {
    ...font(12, 16, 'black', 'white', 'center'),
  },
  chevron: {
    position: 'absolute',
    bottom: -rem(8),
    alignSelf: 'center',
    transform: [{rotate: '180deg'}],
  },
  closeButton: {
    width: CLOSE_BUTTON_SIZE,
    height: CLOSE_BUTTON_SIZE,
    borderRadius: CLOSE_BUTTON_SIZE / 2,
    borderWidth: 1,
    borderColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    top: -CLOSE_BUTTON_SIZE / 2,
    backgroundColor: COLORS.downriver,
  },
});
