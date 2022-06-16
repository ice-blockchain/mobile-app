// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {SvgProps} from 'react-native-svg';
import {font, rem} from 'rn-units';

type Props = {
  title: string;
  description: string;
  renderIcon: (props: SvgProps) => ReactNode;
};

export const RoleCard = ({title, description, renderIcon}: Props) => {
  return (
    <View style={[styles.container, commonStyles.shadow]}>
      {renderIcon({style: styles.icon})}
      <View style={styles.info}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    </View>
  );
};

export const RoleCardSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={styles.container} />
  </SkeletonPlaceholder>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: rem(8),
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginVertical: SCREEN_SIDE_OFFSET,
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
  },
});
