// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {font} from '@utils/styles';
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
import {rem} from 'rn-units';

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
    borderRadius: rem(16),
    marginHorizontal: SCREEN_SIDE_OFFSET,
    height: rem(68),
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: rem(4),
    marginTop: -rem(16),
    height: rem(76),
    width: rem(76),
  },
  info: {
    flex: 1,
    marginLeft: rem(20),
    marginTop: rem(4),
    justifyContent: 'center',
  },
  titleText: {
    ...font(16, 19, 'bold', 'primaryDark'),
  },
  descriptionText: {
    ...font(12, 15, 'regular', 'secondary'),
    marginTop: rem(4),
  },
});
