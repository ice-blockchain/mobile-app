// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Images} from '@images';
import {GetStartedButton} from '@screens/CreativeIceLibrary/components/GetStartedSection/components/GetStartedButton';
import {GetStartedCarousel} from '@screens/CreativeIceLibrary/components/GetStartedSection/components/GetStartedCarousel';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export function GetStartedSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {t('creative_library.get_started.header')}
      </Text>
      <GetStartedButton />
      <View style={styles.imageContainer}>
        <Image source={Images.creativeLibrary.getStarted} />
      </View>
      <Text style={styles.subtitle}>
        {t('creative_library.get_started.subtitle')}
      </Text>
      <Text style={styles.description}>
        {t('creative_library.get_started.description')}
      </Text>
      <GetStartedCarousel />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.alabaster,
    paddingTop: rem(16),
    paddingBottom: rem(30),
  },
  header: {
    paddingLeft: SCREEN_SIDE_OFFSET,
    paddingRight: rem(48),
    ...font(32, 42, 'semibold', 'primaryDark'),
  },
  imageContainer: {
    alignSelf: 'center',
    paddingTop: rem(30),
  },
  subtitle: {
    paddingTop: rem(44),
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    ...font(22, 26, 'bold', 'primaryDark'),
  },
  description: {
    paddingTop: rem(14),
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    ...font(14, 20, 'regular', 'emperor'),
  },
});
