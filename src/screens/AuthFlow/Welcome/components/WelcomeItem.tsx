// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import {Text, View, StyleSheet, Image, ImageRequireSource} from 'react-native';
import {rem, font, combineStyles} from 'rn-units';

import {FONTS} from '@constants/fonts';
import {COLORS} from '@constants/colors';
interface WelcomeItemProps {
  title: string;
  image: ImageRequireSource;
  text: JSX.Element;
  index: string;
  imageSize: {
    height: number;
    width: number;
  };
}

const DESCRIPTION_MARGIN_TOP = 70;

const WelcomeItem = ({title, image, text, imageSize}: WelcomeItemProps) => {
  return (
    <View style={styles.container}>
      <View
        style={combineStyles(styles.imageContainer, {
          marginTop: rem(429 - imageSize.height - DESCRIPTION_MARGIN_TOP),
        })}>
        <Image
          source={image}
          style={{width: imageSize.width, height: imageSize.height}}
          resizeMode={'contain'}
        />
      </View>
      <View style={styles.description}>
        <Text style={styles.title}>{title}</Text>
        {text}
      </View>
    </View>
  );
};

export default WelcomeItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    marginTop: rem(DESCRIPTION_MARGIN_TOP),
  },
  title: {
    fontFamily: FONTS.primary.black,
    fontSize: font(28),
    textAlign: 'center',
    marginBottom: rem(21),
    color: COLORS.darkBlue,
  },
});
