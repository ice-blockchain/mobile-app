// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import React, {ReactNode} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {font, rem} from 'rn-units';

type Props = {
  title: string;
  description: string;
  imageSource: ImageSourcePropType;
  renderBody?: () => ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

export const ImageCardCompact = ({
  title,
  description,
  imageSource,
  renderBody,
  containerStyle,
}: Props) => {
  return (
    <View style={[styles.container, commonStyles.shadow, containerStyle]}>
      <Image source={imageSource} style={styles.icon} />
      <View style={styles.info}>
        <Text
          style={styles.titleText}
          numberOfLines={2}
          adjustsFontSizeToFit={true}>
          {title}
        </Text>
        <Text
          style={styles.descriptionText}
          numberOfLines={2}
          adjustsFontSizeToFit={true}>
          {description}
        </Text>
      </View>
      {renderBody?.()}
    </View>
  );
};

export const ImageCardCompactSkeleton = ({
  containerStyle,
}: {containerStyle?: StyleProp<ViewStyle>} = {}) => (
  <SkeletonPlaceholder>
    <View style={[styles.container, containerStyle]} />
  </SkeletonPlaceholder>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: rem(8),
    marginHorizontal: SCREEN_SIDE_OFFSET,
    height: rem(73),
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: rem(10),
    height: rem(55),
    width: rem(55),
  },
  info: {
    flex: 1,
    marginLeft: rem(8),
    justifyContent: 'center',
  },
  titleText: {
    fontSize: font(16),
    lineHeight: font(19),
    fontFamily: FONTS.primary.bold,
    color: COLORS.darkBlue,
  },
  descriptionText: {
    fontSize: font(12),
    lineHeight: font(15),
    fontFamily: FONTS.primary.regular,
    color: COLORS.emperor,
    marginTop: rem(4),
  },
});
