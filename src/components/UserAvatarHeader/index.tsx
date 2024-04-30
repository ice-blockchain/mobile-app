// SPDX-License-Identifier: ice License 1.0

import {Avatar, DEFAULT_AVATAR_SIZE} from '@components/Avatar/Avatar';
import {EditableAvatar} from '@components/Avatar/EditableAvatar';
import {LinesBackground} from '@components/LinesBackground';
import {COLORS} from '@constants/colors';
import {CroppedImage} from '@hooks/useActionSheetUpdateAvatar';
import {userSelector} from '@store/modules/Account/selectors';
import {font} from '@utils/styles';
import {buildUsernameWithPrefix} from '@utils/username';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  onChange?: (image: CroppedImage | null) => void;
  updateAvatarLoading?: boolean;
};

export const UserAvatarHeader = ({
  onChange,
  updateAvatarLoading = false,
}: Props) => {
  const user = useSelector(userSelector);

  return (
    <View style={styles.container}>
      <LinesBackground style={styles.linesBackground} />
      {onChange ? (
        <EditableAvatar
          uri={user?.profilePictureUrl}
          style={styles.avatarImage}
          onChange={onChange}
          loading={updateAvatarLoading}
        />
      ) : (
        <Avatar uri={user?.profilePictureUrl} style={styles.avatarImage} />
      )}
      <Text style={styles.usernameText} numberOfLines={1}>
        {buildUsernameWithPrefix(user?.username)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: rem(DEFAULT_AVATAR_SIZE / 2 + 8),
    alignItems: 'center',
    marginBottom: rem(22),
  },
  avatarImage: {
    marginTop: -rem(DEFAULT_AVATAR_SIZE / 2 - 4),
    borderWidth: rem(5),
    borderColor: COLORS.foam,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
  },
  usernameText: {
    alignSelf: 'center',
    marginTop: rem(10),
    ...font(17, 22, 'semibold'),
  },
  linesBackground: {
    overflow: 'hidden',
    borderTopLeftRadius: rem(30),
    borderTopRightRadius: rem(30),
  },
});
