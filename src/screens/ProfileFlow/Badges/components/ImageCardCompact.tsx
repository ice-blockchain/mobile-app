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
  description: string | ReactNode;
  image: ImageSourcePropType;
  renderBody?: () => ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

export const ImageCardCompact = ({
  title,
  description,
  image,
  renderBody,
  containerStyle,
}: Props) => {
  return (
    <View style={[styles.container, commonStyles.shadow, containerStyle]}>
      <Image style={styles.icon} resizeMode="contain" source={image} />

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
    marginLeft: rem(9),
    marginTop: -rem(16),
    height: rem(76),
    width: rem(76),
  },
  info: {
    flex: 1,
    marginLeft: rem(14),
    marginTop: rem(4),
    justifyContent: 'center',
  },
  titleText: {
    ...font(16, 21, 'bold', 'primaryDark'),
  },
  descriptionText: {
    ...font(12, 16, 'medium', 'secondary'),
    marginTop: rem(4),
  },
});
