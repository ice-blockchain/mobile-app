// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {CheckboxActive} from '@svg/CheckboxActive';
import {CheckboxInactive} from '@svg/CheckboxInactive';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

type Props = {
  checked: boolean;
  onValueChange: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

export const CheckBox = ({checked, onValueChange, style}: Props) => {
  return (
    <Touchable
      onPress={() => onValueChange(!checked)}
      hitSlop={MIDDLE_BUTTON_HIT_SLOP}>
      {checked ? (
        <CheckboxActive style={style} />
      ) : (
        <CheckboxInactive style={style} />
      )}
    </Touchable>
  );
};
