// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {SvgProps} from 'react-native-svg';
import {font, rem} from 'rn-units';

type Props = {
  title: string;
  description: string;
  renderIcon: (props: SvgProps) => ReactNode;
  renderBody?: () => ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

export const IconCard = ({
  title,
  description,
  renderIcon,
  renderBody,
  containerStyle,
}: Props) => {
  return (
    <View style={[styles.container, containerStyle, commonStyles.shadow]}>
      {renderIcon({style: styles.icon})}
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

export const IconCardSkeleton = ({
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
  },
  icon: {
    marginLeft: 10,
    marginTop: 10,
    height: rem(54),
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
