// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {ProfileActiveIcon} from '@svg/ProfileActiveIcon';
import {ProfileInactiveIcon} from '@svg/ProfileInactiveIcon';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

type Props = {
  focused: boolean;
};

const DEV_PROFILE_IMAGE =
  'https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/08/26/13/mr-bean.jpg';

export const ProfileIcon = ({focused}: Props) => {
  const noAvatar = true;
  return (
    <View>
      {noAvatar ? (
        focused ? (
          <ProfileActiveIcon />
        ) : (
          <ProfileInactiveIcon />
        )
      ) : (
        <View
          style={[
            styles.imageBorder,
            focused ? styles.imageBorderFocused : null,
          ]}>
          <Image source={{uri: DEV_PROFILE_IMAGE}} style={styles.image} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageBorder: {
    borderRadius: 15,
    borderWidth: 1.5,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderColor: COLORS.gulfBlue,
  },
  imageBorderFocused: {
    borderColor: COLORS.persianBlue,
  },
  image: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
});
