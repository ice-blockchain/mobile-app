// SPDX-License-Identifier: ice License 1.0

import {Images} from '@images';
import {SocialKycMethod} from '@store/modules/SocialKyc/types';
import {isRTL, t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {isAndroid, rem} from 'rn-units';

type Props = {
  socialKycMethod: SocialKycMethod;
};

export function VerifyWithHeader({socialKycMethod}: Props) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.icon}
        source={
          socialKycMethod === 'Facebook'
            ? Images.badges.socialKyc.fbDark
            : Images.badges.socialKyc.xDark
        }
      />
      <Text style={styles.text}>
        {t('social_kyc.verify_with_title', {method: socialKycMethod})}
      </Text>
    </View>
  );
}

const ICON_SIZE = rem(27);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: rem(7),
  },
  text: {
    paddingLeft: isRTL && isAndroid ? null : rem(14),
    paddingRight: isRTL && isAndroid ? rem(14) : null,
    ...font(24, 32, 'black', 'primaryDark', 'left'),
  },
});
