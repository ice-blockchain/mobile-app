// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {Images} from '@images';
import {DownloadIcon} from '@svg/DownloadIcon';
import {t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
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

export const OkxWalletCard = ({style}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Touchable
        style={styles.card}
        onPress={() => openLinkWithInAppBrowser({url: LINKS.OKX_WALLET})}>
        <Image source={Images.card.okxWallet} style={styles.image} />
        <Text style={styles.descriptionText}>
          {t('ethereum_address.okxWalletDescription')}
        </Text>
        <View style={styles.action}>
          <DownloadIcon />
          <Text style={styles.actionText}>
            {t('ethereum_address.okxWalletAction')}
          </Text>
        </View>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: rem(16),
    paddingVertical: rem(14),
    alignItems: 'center',
  },
  image: {
    width: rem(80),
    height: rem(45),
  },
  descriptionText: {
    marginTop: rem(12),
    marginHorizontal: rem(40),
    ...font(12, 18, 'regular', 'white', 'center'),
  },
  action: {
    marginTop: rem(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    ...font(12, 18, 'bold'),
    marginStart: rem(6),
  },
});
