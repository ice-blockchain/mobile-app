// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Images} from '@images';
import {t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const JoinMainnet = memo(() => {
  const onPress = () =>
    openLinkWithInAppBrowser({url: LINKS.JOIN_DECENTRALIZED_FUTURE});

  return (
    <Touchable
      onPress={onPress}
      style={[styles.container, commonStyles.shadow]}>
      <Image source={Images.card.joinMainnet} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.titleText}>
          {t('mainnet_landing.join_mainnet.title')}
        </Text>
        <Text style={styles.subtitleText}>
          {t('mainnet_landing.join_mainnet.subtitle')}
        </Text>
      </View>
    </Touchable>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    backgroundColor: COLORS.white,
    borderRadius: rem(16),
    marginTop: rem(24),
  },
  image: {
    width: '100%',
    // height:undefined is required to make it work
    height: undefined,
    aspectRatio: 335 / 140,
  },
  body: {
    marginTop: rem(10),
    marginHorizontal: rem(12),
    marginBottom: rem(12),
  },
  titleText: {
    ...font(13, 16, 'black', 'primaryDark'),
  },
  subtitleText: {
    marginTop: rem(4),
    ...font(12, 16, 'medium', 'secondary'),
  },
});
