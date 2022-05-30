// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import * as React from 'react';
import {Image, ImageRequireSource, StyleSheet, Text, View} from 'react-native';
import {font, isAndroid, rem, screenHeight} from 'rn-units';

import {WelcomeItemDescription} from './components/WelcomeItemDescription';

interface WelcomeItemProps {
  title: string;
  image: ImageRequireSource;
  description: Array<String | number>; // where 1 is icon with text 'ice';
  index: string;
}

const DESIGN_SCREEN_HEIGHT = 812;
const ORIGINAL_IMAGE_HEIGHT = 380;
const ORIGINAL_IMAGE_WIDTH = 375;
const DESIGN_MARGIN_TOP = isAndroid ? 15 : 22;
const SMALL_SCREEEN = screenHeight < DESIGN_SCREEN_HEIGHT;
const IMAGE_HEIGHT = SMALL_SCREEEN
  ? (screenHeight / DESIGN_SCREEN_HEIGHT) * ORIGINAL_IMAGE_HEIGHT
  : ORIGINAL_IMAGE_HEIGHT;
const IMAGE_WIDTH = SMALL_SCREEEN
  ? (screenHeight / DESIGN_SCREEN_HEIGHT) * ORIGINAL_IMAGE_WIDTH
  : ORIGINAL_IMAGE_WIDTH;
const MARGIN_TOP = SMALL_SCREEEN
  ? (screenHeight / DESIGN_SCREEN_HEIGHT) * DESIGN_MARGIN_TOP
  : DESIGN_MARGIN_TOP;

export const WelcomeItem = ({title, image, description}: WelcomeItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode={'contain'} />
      </View>
      <View style={styles.description}>
        <Text style={styles.title}>{title}</Text>
        <WelcomeItemDescription items={description} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    marginTop: rem(MARGIN_TOP),
    paddingHorizontal: rem(30),
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.primary.regular,
    fontWeight: '900',
    fontSize: font(28),
    lineHeight: font(34),
    textAlign: 'center',
    marginBottom: rem(MARGIN_TOP),
    color: COLORS.darkBlue,
  },
  image: {width: IMAGE_WIDTH, height: IMAGE_HEIGHT},
});
