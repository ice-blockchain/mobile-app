// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {POPUP_SIDE_OFFSET} from '@constants/styles';
import {Images} from '@images';
import {openLinkWithInAppBrowser} from '@utils/device';
import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Platform = {logo: ImageSourcePropType; link: string};

const platforms: Platform[] = [
  {logo: Images.platforms.okx, link: 'https://google.com1'},
  {logo: Images.platforms.kucoin, link: 'https://google.com2'},
  {logo: Images.platforms.gate, link: 'https://google.com3'},
  {logo: Images.platforms.mexc, link: 'https://google.com4'},
  {logo: Images.platforms.bitget, link: 'https://google.com5'},
  {logo: Images.platforms.bitmart, link: 'https://google.com6'},
  {logo: Images.platforms.poloneix, link: 'https://google.com11'},
  {logo: Images.platforms.bingx, link: 'https://google.com7'},
  {logo: Images.platforms.bitrue, link: 'https://google.com8'},
  {logo: Images.platforms.uniswap, link: 'https://google.com10'},
  {logo: Images.platforms.pancake, link: 'https://google.com9'},
];

export const Platforms = () => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        {platforms.map(platform => {
          return (
            <Touchable
              key={platform.link}
              style={styles.logo}
              onPress={() => openLinkWithInAppBrowser({url: platform.link})}>
              <Image
                source={platform.logo}
                style={styles.image}
                resizeMode={'contain'}
              />
            </Touchable>
          );
        })}
      </View>
      <Image
        source={Images.backgrounds.roundedStroke}
        style={[StyleSheet.absoluteFill, styles.background]}
        resizeMode={'stretch'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: rem(8),
    marginHorizontal: POPUP_SIDE_OFFSET,
  },
  body: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: rem(10),
    paddingVertical: rem(6),
  },
  logo: {
    width: '50%',
    aspectRatio: 160 / 30,
    marginVertical: rem(10),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  background: {
    width: undefined,
    height: undefined,
  },
});
