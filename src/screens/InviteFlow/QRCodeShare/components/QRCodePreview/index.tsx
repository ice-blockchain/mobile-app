// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {windowWidth} from '@constants/styles';
import {QRCode} from '@screens/InviteFlow/QRCodeShare/components/QRCodePreview/components/QRCode';
import {
  AVATAR_SIZE,
  QRCodeAvatar,
} from '@screens/InviteFlow/QRCodeShare/components/QRCodePreview/components/QRCodeAvatar';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import {buildUsernameLink} from '@utils/username';
import React, {forwardRef, Ref} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  user: User;
};

export const QRCodePreview = forwardRef(
  ({user}: Props, forwardedRef: Ref<View>) => {
    return (
      <View style={styles.container} ref={forwardedRef}>
        <View style={styles.body}>
          <QRCodeAvatar uri={user.profilePictureUrl} />
          <Text style={styles.usernameText}>@{user.username}</Text>
          <QRCode
            size={windowWidth * 0.5}
            input={buildUsernameLink(user.username)}
            containerStyle={styles.qrCode}
          />
          <Text style={styles.descriptionText}>{t('qr_code.description')}</Text>
          <Text style={styles.iceLabel}>
            <IceLabel
              color={COLORS.black}
              iconSize={rem(30)}
              textStyle={styles.iceLabelText}
            />
          </Text>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: rem(16),
    marginTop: -rem(20),
    backgroundColor: 'transparent', // has to be defined for android view-shot
  },
  body: {
    alignItems: 'center',
    marginTop: AVATAR_SIZE / 2,
    backgroundColor: COLORS.white,
    borderRadius: rem(16),
  },
  usernameText: {
    marginTop: rem(12) + AVATAR_SIZE / 2,
    ...font(17, 20.4, 'semibold', 'black'),
  },
  qrCode: {
    marginTop: rem(26),
  },
  descriptionText: {
    marginTop: rem(24),
    ...font(14, 16.8, 'semibold', 'black'),
  },
  iceLabel: {
    marginTop: rem(20),
    marginBottom: rem(12),
  },
  iceLabelText: {
    ...font(28, 33, 'bold', 'black'),
  },
});
