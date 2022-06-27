// SPDX-License-Identifier: BUSL-1.1

import React from 'react';
import {FlexStyle, StyleProp, TouchableOpacity, ViewStyle} from 'react-native';

type TouchableProps = {
  onPress?: () => void;
  onLongPress?: () => {};
  delay?: number;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle | FlexStyle>;
  hitSlop?: object;
  disabled?: boolean;
};

export function Touchable({
  onPress,
  onLongPress,
  delay = 300,
  ...rest
}: TouchableProps): React.ReactElement {
  const lastTimePressed = React.useRef(0);

  const handlePress = () => {
    const timestamp = Date.now();
    const diff = timestamp - lastTimePressed.current;
    if (diff < delay) {
      // ignore monkey-press
      return;
    }

    lastTimePressed.current = timestamp;
    if (onPress) {
      requestAnimationFrame(onPress);
    }
  };

  const handleLongPress = () => {
    const timestamp = Date.now();
    const diff = timestamp - lastTimePressed.current;
    if (diff < delay) {
      // ignore monkey-press
      return;
    }

    lastTimePressed.current = timestamp;
    if (onLongPress) {
      requestAnimationFrame(onLongPress);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      onLongPress={handleLongPress}
      {...rest}
    />
  );
}
