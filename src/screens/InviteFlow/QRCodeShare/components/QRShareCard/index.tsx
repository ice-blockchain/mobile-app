// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {Images} from '@images';
import {logError} from '@services/logging';
import {openShareDialog} from '@services/share';
import {ShareIcon} from '@svg/ShareIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {RefObject} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {captureRef} from 'react-native-view-shot';
import {rem} from 'rn-units';

type Props = {
  user: User;
  qrCodePreviewRef: RefObject<View>;
};

export const QRShareCard = ({user, qrCodePreviewRef}: Props) => {
  const onSharePress = async () => {
    try {
      const url = await captureRef(qrCodePreviewRef, {
        fileName: `${user.username}_qr_code`,
      });
      await openShareDialog({url});
    } catch (error) {
      logError(error);
    }
  };

  return (
    <View style={styles.container}>
      <Touchable onPress={onSharePress} hitSlop={MIDDLE_BUTTON_HIT_SLOP}>
        <Image
          source={Images.share.shareProviders}
          style={styles.image}
          resizeMode="contain"
        />
      </Touchable>
      <PrimaryButton
        text={t('invite_share.share')}
        icon={<ShareIcon />}
        onPress={onSharePress}
        customBackground={true}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  image: {
    height: rem(34),
    alignSelf: 'center',
  },
  button: {
    backgroundColor: COLORS.white,
    height: rem(48),
    marginTop: rem(34),
    marginHorizontal: rem(38),
  },
  buttonText: {
    ...font(14, 19, 'black', 'primaryDark'),
    marginHorizontal: rem(4),
  },
});
