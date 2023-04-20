// SPDX-License-Identifier: ice License 1.0

import {Avatar} from '@components/Avatar/Avatar';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {windowWidth} from '@constants/styles';
import {QRCode} from '@screens/InviteFlow/QRCodeShare/components/QRCodePreview/components/QRCode';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {forwardRef, Ref} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

const AVATAR_SIZE = rem(82);

export const QRCodePreview = forwardRef((_, forwardedRef: Ref<View>) => {
  const user = useSelector(unsafeUserSelector);
  return (
    <View style={styles.container} ref={forwardedRef}>
      <View style={styles.body}>
        <Avatar
          uri={user.profilePictureUrl}
          style={styles.avatar}
          size={AVATAR_SIZE}
          borderRadius={rem(24)}
        />
        <Text style={styles.usernameText}>@{user.username}</Text>
        <QRCode
          size={windowWidth * 0.5}
          input={user.username}
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
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: rem(16),
    marginTop: -rem(20),
  },
  body: {
    alignItems: 'center',
    marginTop: AVATAR_SIZE / 2,
    backgroundColor: COLORS.white,
    borderRadius: rem(16),
  },
  avatar: {
    position: 'absolute',
    top: -AVATAR_SIZE / 2,
    alignSelf: 'center',
    borderWidth: rem(3),
    borderColor: COLORS.white,
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
