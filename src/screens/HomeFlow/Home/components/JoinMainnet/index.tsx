// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Images} from '@images';
import {t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const JoinMainnet = memo(() => {
  const onPress = () => openLinkWithInAppBrowser({url: LINKS.WHITEPAPER});

  return (
    <Touchable onPress={onPress}>
      <View style={[styles.container, commonStyles.shadow]}>
        <Image source={Images.card.joinMainnet} style={styles.image} />
        <Text>{t('home.join_mainnet.title')}</Text>
      </View>
    </Touchable>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    backgroundColor: COLORS.white,
    borderRadius: rem(16),
    marginTop: rem(16),
  },
  image: {
    width: '100%',
    // height:undefined is required to make it work
    height: undefined,
    aspectRatio: 335 / 140,
  },
});
