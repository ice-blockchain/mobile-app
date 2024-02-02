// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {Coordinates} from '@screens/Modals/types';
import {InfoOutlineIcon} from '@svg/InfoOutlineIcon';
import {isRTL} from '@translations/i18n';
import React, {useRef} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onInfoIconPressed?: (coordinates: Coordinates) => void;
};

const ICON_SIZE = rem(10);

export function InfoButton({onInfoIconPressed}: Props) {
  const buttonRef = useRef<TouchableOpacity>(null);

  const onInfoPress = () => {
    buttonRef.current?.measure((_, __, width, height, x, y) => {
      onInfoIconPressed?.({
        top: y + height,
        left: x + width / 2,
      });
    });
  };
  return onInfoIconPressed ? (
    <Touchable
      ref={buttonRef}
      hitSlop={SMALL_BUTTON_HIT_SLOP}
      onPress={onInfoPress}>
      <InfoOutlineIcon
        style={styles.infoButton}
        color={COLORS.shamrock}
        width={ICON_SIZE}
        height={ICON_SIZE}
      />
    </Touchable>
  ) : null;
}
const styles = StyleSheet.create({
  infoButton: {
    marginLeft: isRTL ? 0 : rem(4),
    marginRight: isRTL ? rem(4) : 0,
  },
});
