// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onPress: () => void;
  LeadingIcon?: ReactNode;
  TrailingIcon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  leadingIconContainerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  subtitleTextStyle?: StyleProp<TextStyle>;
  trailingIconContainerStyle?: StyleProp<ViewStyle>;
  title?: string;
  subtitle?: string;
};

const ICON_CONTAINER_SIZE = rem(36);

export const ActionListItem = ({
  onPress,
  LeadingIcon,
  TrailingIcon,
  containerStyle,
  leadingIconContainerStyle,
  titleTextStyle,
  subtitleTextStyle,
  trailingIconContainerStyle,
  title,
  subtitle,
}: Props) => {
  return (
    <Touchable style={[styles.container, containerStyle]} onPress={onPress}>
      {LeadingIcon && (
        <View style={[styles.leadingIconContainer, leadingIconContainerStyle]}>
          {LeadingIcon}
        </View>
      )}
      <View style={styles.content}>
        {title && (
          <Text style={[styles.titleText, titleTextStyle]}>{title}</Text>
        )}
        {subtitle && (
          <Text style={[styles.subtitleText, subtitleTextStyle]}>
            {subtitle}
          </Text>
        )}
      </View>
      {TrailingIcon && (
        <View
          style={[styles.trailingIconContainer, trailingIconContainerStyle]}>
          {TrailingIcon}
        </View>
      )}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: rem(12),
    flexDirection: 'row',
    alignItems: 'center',
    height: rem(60),
    borderRadius: rem(16),
    backgroundColor: COLORS.white,
  },
  leadingIconContainer: {
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rem(12),
    backgroundColor: COLORS.primaryLight,
  },
  content: {
    marginLeft: rem(12),
    justifyContent: 'center',
    flex: 1,
  },
  titleText: {
    ...font(14, 19, 'black', 'primaryDark'),
  },
  subtitleText: {
    marginTop: rem(4),
    ...font(12, 16, 'medium', 'toreaBay'),
  },
  trailingIconContainer: {
    marginLeft: rem(8),
  },
});
