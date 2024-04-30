// SPDX-License-Identifier: ice License 1.0

import {commonStyles} from '@constants/styles';
import {Images} from '@images';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const WalletCard = ({style}: Props) => {
  return (
    <View style={[commonStyles.flexOne, style]}>
      <View style={styles.card}>
        <Image
          source={Images.backgrounds.blueSquaresBg}
          style={[StyleSheet.absoluteFill, styles.backgroundImage]}
          resizeMode={'repeat'}
        />
        <Image source={Images.card.wallet} style={styles.logoImage} />
        <Text style={styles.descriptionText}>
          {replaceString(
            t('bsc_address.walletDescription'),
            tagRegex('bold', false),
            (match, index) => (
              <Text key={match + index} style={styles.boldDescriptionText}>
                {match}
              </Text>
            ),
          )}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: rem(16),
    paddingVertical: rem(26),
    overflow: 'hidden',
    alignItems: 'center',
  },
  backgroundImage: {
    width: undefined,
    height: undefined,
  },
  logoImage: {
    width: rem(264),
  },
  descriptionText: {
    marginTop: rem(20),
    marginHorizontal: rem(26),
    ...font(12, 18, 'regular', 'white', 'center'),
  },
  boldDescriptionText: {
    ...font(12, 18, 'bold', 'white', 'center'),
  },
});
