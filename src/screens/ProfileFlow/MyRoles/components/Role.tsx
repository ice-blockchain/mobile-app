// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {CheckMark} from '@screens/ProfileFlow/MyRoles/components/CheckMark';
import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {font, rem} from 'rn-units';

type Props = {
  title: string;
  tagline: string;
  description: string;
  imageSource: ImageSourcePropType;
  backgroundColor?: string;
  checked?: boolean;
};

export const Role = ({
  title,
  tagline,
  description,
  imageSource,
  backgroundColor,
  checked = false,
}: Props) => {
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={styles.titleText}>{title}</Text>
      <View>
        <Image source={imageSource} style={styles.icon} />
        {checked && <CheckMark style={styles.checkmark} />}
      </View>
      <Text style={styles.taglineText}>{tagline}</Text>
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: rem(22),
    paddingHorizontal: SCREEN_SIDE_OFFSET + rem(30),
  },
  titleText: {
    marginTop: rem(20),
    fontFamily: FONTS.primary.bold,
    fontSize: font(20),
    color: COLORS.darkBlue,
  },
  icon: {
    marginTop: rem(12),
    width: rem(130),
    height: rem(130),
  },
  checkmark: {
    position: 'absolute',
    bottom: rem(5),
    right: rem(10),
  },
  taglineText: {
    marginTop: rem(8),
    fontFamily: FONTS.primary.bold,
    fontSize: font(18),
    lineHeight: font(20),
    color: COLORS.darkBlue,
    textAlign: 'center',
  },
  descriptionText: {
    marginTop: rem(14),
    fontFamily: FONTS.primary.regular,
    fontSize: font(14),
    lineHeight: font(20),
    color: COLORS.greyText,
    textAlign: 'center',
  },
});
