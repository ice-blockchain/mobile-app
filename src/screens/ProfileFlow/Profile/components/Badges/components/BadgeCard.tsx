// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {commonStyles} from '@constants/styles';
import React, {memo} from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {font, rem} from 'rn-units';

type Props = {
  title: string;
  category: string;
  progressText: string;
  progressValue: number;
  imageSource: ImageSourcePropType;
};

export const BadgeCard = memo(
  ({imageSource, title, category, progressText, progressValue}: Props) => {
    return (
      <View style={[styles.container, commonStyles.shadow]}>
        <Text
          style={styles.titleText}
          numberOfLines={1}
          adjustsFontSizeToFit={true}>
          {title}
        </Text>
        <Image
          source={imageSource}
          style={styles.icon}
          resizeMode={'contain'}
        />
        <View style={styles.progressHeader}>
          <Text
            style={styles.categoryText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}>
            {category}
          </Text>
          <Text style={styles.progressText}>{progressText}</Text>
        </View>
        <View style={styles.progressBody}>
          <View style={[styles.progressValue, {width: `${progressValue}%`}]} />
        </View>
      </View>
    );
  },
);

export const BadgeCardSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={styles.container} />
  </SkeletonPlaceholder>
);

export const CARD_OFFSET = rem(8);

const styles = StyleSheet.create({
  container: {
    width: rem(120),
    height: rem(174),
    backgroundColor: COLORS.white,
    borderRadius: rem(8),
    marginHorizontal: CARD_OFFSET,
    marginVertical: CARD_OFFSET,
    alignItems: 'center',
  },
  titleText: {
    fontFamily: FONTS.primary.bold,
    fontSize: font(14),
    lineHeight: font(17),
    color: COLORS.darkBlue,
    marginTop: rem(16),
    marginHorizontal: rem(6),
  },
  progressHeader: {
    flexDirection: 'row',
    marginHorizontal: rem(12),
  },
  icon: {
    marginHorizontal: rem(10),
    marginVertical: rem(10),
    flex: 1,
  },
  categoryText: {
    flex: 1,
    fontFamily: FONTS.primary.regular,
    fontSize: font(12),
    lineHeight: font(14),
    color: COLORS.darkBlue,
  },
  progressText: {
    fontFamily: FONTS.primary.regular,
    fontSize: font(12),
    lineHeight: font(14),
    color: COLORS.periwinkleGray,
  },
  progressBody: {
    height: rem(8),
    borderRadius: rem(4),
    backgroundColor: COLORS.linkWater,
    marginHorizontal: rem(12),
    alignSelf: 'stretch',
    marginTop: rem(4),
    marginBottom: rem(10),
  },
  progressValue: {
    height: rem(8),
    borderRadius: rem(4),
    backgroundColor: COLORS.shamrock,
  },
});
