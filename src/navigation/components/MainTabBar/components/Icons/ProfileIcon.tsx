// SPDX-License-Identifier: ice License 1.0

import {Avatar} from '@components/Avatar/Avatar';
import {COLORS} from '@constants/colors';
import {userSelector} from '@store/modules/Account/selectors';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  focused: boolean;
};

const AVATAR_SIZE = rem(22);

export const ProfileIcon = ({focused}: Props) => {
  const user = useSelector(userSelector);
  return (
    <View
      style={[styles.container, focused ? styles.imageBorderFocused : null]}>
      {user?.profilePictureUrl && (
        <Avatar
          uri={user.profilePictureUrl}
          size={AVATAR_SIZE}
          borderRadius={AVATAR_SIZE / 2}
          allowFullScreen={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: (AVATAR_SIZE + 6) / 2,
    borderWidth: 1.5,
    paddingVertical: 1.5,
    paddingHorizontal: 1.5,
    borderColor: COLORS.secondary,
  },
  imageBorderFocused: {
    borderColor: COLORS.primaryLight,
  },
});
