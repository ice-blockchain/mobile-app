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
  {logo: Images.platforms.okx, link: 'https://www.okx.com/trade-spot/ice-usdt'},
  {
    logo: Images.platforms.kucoin,
    link: 'https://www.kucoin.com/trade/ICE-USDT',
  },
  {logo: Images.platforms.gate, link: 'https://www.gate.io/trade/ICE_USDT'},
  {logo: Images.platforms.htx, link: 'http://htx.com/trade/ice_usdt'},
  {
    logo: Images.platforms.mexc,
    link: 'https://www.mexc.com/exchange/ICENETWORK_USDT',
  },
  {logo: Images.platforms.bitget, link: 'https://www.bitget.com/spot/ICEUSDT'},
  {
    logo: Images.platforms.bitmart,
    link: 'https://www.bitmart.com/trade/en-US?symbol=ICENETWORK_USDT',
  },
  {
    logo: Images.platforms.poloneix,
    link: 'https://poloniex.com/trade/ICENETWORK_USDT/?type=spot',
  },
  {
    logo: Images.platforms.bitrue,
    link: 'https://www.bitrue.com/trade/ice1_usdt',
  },
  {
    logo: Images.platforms.tokero,
    link: 'https://tokero.com/en/exchange/buy/ice/eur/',
  },
  {logo: Images.platforms.bingx, link: 'https://bingx.com/en-gb/spot/ICEUSDT/'},
  {
    logo: Images.platforms.bitconomy,
    link: 'https://www.biconomy.com/exchange/ICE_USDT',
  },
  {
    logo: Images.platforms.xtcom,
    link: 'https://www.xt.com/en/trade/ice_usdt',
  },
  {
    logo: Images.platforms.onus,
    link: 'https://goonus.io/en/markets/ICE_USD/',
  },
  {
    logo: Images.platforms.bifinance,
    link: 'https://www.bifinance.com/trade?symbol=ICE/USDT',
  },
  {
    logo: Images.platforms.pancake,
    link: 'https://pancakeswap.finance/swap?outputCurrency=0xc335Df7C25b72eEC661d5Aa32a7c2B7b2a1D1874&inputCurrency=0x55d398326f99059fF775485246999027B3197955',
  },
  {
    logo: Images.platforms.raydium,
    link: 'https://raydium.io/swap/?inputCurrency=sol&outputCurrency=E9aPbhb5xRVGP2L6qJixfJC5qWAzECpUFUxnGx3wUiND&fixed=in',
  },
  {
    logo: Images.platforms.uniswapEthereum,
    link: 'https://app.uniswap.org/tokens/ethereum/0x79f05c263055ba20ee0e814acd117c20caa10e0c',
  },
  {
    logo: Images.platforms.uniswapArbitrum,
    link: 'https://app.uniswap.org/explore/tokens/arbitrum/0xab8ebcc9eecc20bd30c7b75c7b4e8fcccfbf01ab',
  },
  {
    logo: Images.platforms.jupiter,
    link: 'https://jup.ag/swap/SOL-E9aPbhb5xRVGP2L6qJixfJC5qWAzECpUFUxnGx3wUiND',
  },
];

export const Platforms = () => {
  return (
    <View style={styles.container}>
      <Image
        source={Images.backgrounds.roundedStroke}
        style={[StyleSheet.absoluteFill, styles.background]}
        resizeMode={'stretch'}
      />
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
