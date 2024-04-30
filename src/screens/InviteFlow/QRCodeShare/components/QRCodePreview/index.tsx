// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {IceLabel} from '@components/Labels/IceLabel';
import {LinesBackground} from '@components/LinesBackground';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET, windowWidth} from '@constants/styles';
import {PrivacyButton} from '@screens/InviteFlow/QRCodeShare/components/QRCodePreview/components/PrivacyButton';
import {QRCode} from '@screens/InviteFlow/QRCodeShare/components/QRCodePreview/components/QRCode';
import {
  AVATAR_SIZE,
  QRCodeAvatar,
} from '@screens/InviteFlow/QRCodeShare/components/QRCodePreview/components/QRCodeAvatar';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import {buildUsernameLink, buildUsernameWithPrefix} from '@utils/username';
import React, {forwardRef, Ref, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  user: User;
};

export const QRCodePreview = forwardRef(
  ({user}: Props, forwardedRef: Ref<View>) => {
    const [showAvatar, setShowAvatar] = useState(true);
    return (
      <>
        <View style={styles.container}>
          <QRCodeBody
            user={user}
            isAvatarBlurred={!showAvatar}
            isAvatarShown={true}
          />
          <PrivacyButton
            isClosed={!showAvatar}
            onPress={() => setShowAvatar(show => !show)}
            style={styles.privacyButton}
          />
        </View>
        {/* Hidden copy with custom styles for view-snapshot */}
        <View style={styles.viewShotContainer} ref={forwardedRef}>
          <LinesBackground />
          <QRCodeBody
            user={user}
            isAvatarBlurred={false}
            isAvatarShown={showAvatar}
          />
        </View>
      </>
    );
  },
);

const QRCodeBody = ({
  user,
  isAvatarShown,
  isAvatarBlurred,
}: {
  user: User;
  isAvatarBlurred: boolean;
  isAvatarShown: boolean;
}) => {
  return (
    <View style={styles.body}>
      {isAvatarShown && (
        <QRCodeAvatar
          uri={user.profilePictureUrl}
          isBlurred={isAvatarBlurred}
        />
      )}
      <Text style={styles.usernameText}>
        {buildUsernameWithPrefix(user.username)}
      </Text>
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
          iconOffsetY={6}
        />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rem(16),
    marginTop: -rem(20),
  },
  viewShotContainer: {
    position: 'absolute',
    left: windowWidth,
    top: 0,
    width: windowWidth,
    paddingHorizontal: rem(16),
    paddingVertical: rem(100),
    backgroundColor: COLORS.primaryLight,
  },
  body: {
    alignItems: 'center',
    marginTop: AVATAR_SIZE / 2,
    backgroundColor: COLORS.white,
    borderRadius: rem(16),
    paddingHorizontal: SCREEN_SIDE_OFFSET,
  },
  usernameText: {
    marginTop: rem(12) + AVATAR_SIZE / 2,
    ...font(17, 22, 'semibold', 'black'),
  },
  qrCode: {
    marginTop: rem(26),
  },
  descriptionText: {
    marginTop: rem(24),
    ...font(14, 19, 'semibold', 'black', 'center'),
  },
  iceLabel: {
    marginTop: rem(20),
    marginBottom: rem(12),
  },
  iceLabelText: {
    ...font(28, 34, 'bold', 'black'),
  },
  privacyButton: {
    position: 'absolute',
    top: AVATAR_SIZE / 2 + rem(22),
    right: windowWidth / 2 - AVATAR_SIZE / 2,
  },
});
