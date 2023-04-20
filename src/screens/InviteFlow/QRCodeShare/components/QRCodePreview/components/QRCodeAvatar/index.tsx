// SPDX-License-Identifier: ice License 1.0

import {Avatar} from '@components/Avatar/Avatar';
import {COLORS} from '@constants/colors';
import {PrivacyButton} from '@screens/InviteFlow/QRCodeShare/components/QRCodePreview/components/QRCodeAvatar/components/PrivacyButton';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const AVATAR_SIZE = rem(82);
const AVATAR_BORDER_RADIUS = rem(24);

type Props = {
  uri: string;
};

export const QRCodeAvatar = ({uri}: Props) => {
  const [isShown, setIsShown] = useState(true);
  return (
    <View style={styles.container}>
      {isShown ? (
        <Avatar
          uri={isShown ? uri : undefined}
          size={AVATAR_SIZE}
          borderRadius={AVATAR_BORDER_RADIUS}
          style={styles.avatar}
        />
      ) : (
        <View style={[styles.avatar, styles.stub]} />
      )}
      <PrivacyButton isShown={isShown} onPress={() => setIsShown(s => !s)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -AVATAR_SIZE / 2,
    alignSelf: 'center',
  },
  avatar: {
    borderWidth: rem(3),
    borderColor: COLORS.white,
  },
  stub: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_BORDER_RADIUS,
    backgroundColor: COLORS.foam,
  },
});
