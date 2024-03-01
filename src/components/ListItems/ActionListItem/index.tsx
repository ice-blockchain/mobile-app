// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onPress?: () => void;
  LeadingIcon?: ReactNode;
  TrailingIcon?: ReactNode;
  backgroundImageSource?: ImageSourcePropType;
  containerStyle?: StyleProp<ViewStyle>;
  leadingIconContainerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  subtitleTextStyle?: StyleProp<TextStyle>;
  trailingIconContainerStyle?: StyleProp<ViewStyle>;
  backgroundImageStyle?: StyleProp<ImageStyle>;
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  disabled?: boolean;
};

const ICON_CONTAINER_SIZE = rem(36);

export const ActionListItem = ({
  onPress,
  LeadingIcon,
  TrailingIcon,
  backgroundImageSource,
  containerStyle,
  leadingIconContainerStyle,
  titleTextStyle,
  subtitleTextStyle,
  trailingIconContainerStyle,
  backgroundImageStyle,
  title,
  subtitle,
  disabled,
}: Props) => {
  return (
    <Touchable
      onPress={onPress}
      style={[styles.container, containerStyle]}
      disabled={disabled}>
      {backgroundImageSource && (
        <Image
          source={backgroundImageSource}
          style={[
            styles.backgroundImage,
            StyleSheet.absoluteFill,
            backgroundImageStyle,
          ]}
          resizeMode={'cover'}
        />
      )}
      {LeadingIcon && (
        <View style={[styles.leadingIconContainer, leadingIconContainerStyle]}>
          {LeadingIcon}
        </View>
      )}
      <View style={styles.content}>
        {typeof title === 'string' ? (
          <Text style={[styles.titleText, titleTextStyle]}>{title}</Text>
        ) : (
          title
        )}
        {typeof subtitle === 'string' ? (
          <Text style={[styles.subtitleText, subtitleTextStyle]}>
            {subtitle}
          </Text>
        ) : (
          subtitle
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
    height: rem(60),
    borderRadius: rem(16),
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: rem(12),
  },
  backgroundImage: {
    borderRadius: rem(16),
    // Set width and height to undefined to make absoluteFill for image work properly
    width: undefined,
    height: undefined,
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
    ...font(14, 17, 'bold', 'primaryDark'),
  },
  subtitleText: {
    marginTop: rem(4),
    ...font(12, 14.4, 'medium', 'toreaBay'),
  },
  trailingIconContainer: {
    marginLeft: rem(8),
  },
});
