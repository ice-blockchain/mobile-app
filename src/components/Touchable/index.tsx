// SPDX-License-Identifier: ice License 1.0

import React, {forwardRef, Ref} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

export type TouchableProps = TouchableOpacityProps;

export const Touchable = forwardRef(
  (
    {onPress = () => {}, children, ...rest}: TouchableOpacityProps,
    forwardedRef: Ref<TouchableOpacity>,
  ) => {
    return (
      <TouchableOpacity
        {...rest}
        ref={forwardedRef}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  },
);
