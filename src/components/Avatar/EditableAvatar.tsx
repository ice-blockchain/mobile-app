// SPDX-License-Identifier: ice License 1.0

import {ActivityIndicator} from '@components/ActivityIndicator';
import {Avatar, AvatarProps} from '@components/Avatar/Avatar';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {
  CroppedImage,
  useActionSheetUpdateAvatar,
} from '@hooks/useActionSheetUpdateAvatar';
import {CameraIcon} from '@svg/CameraIcon';
import React, {memo} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

const PEN_SIZE = rem(32);

type Props = {
  onChange: (image: CroppedImage | null) => void;
  containerStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
} & AvatarProps;

export const EditableAvatar = memo(
  ({uri, onChange, containerStyle, loading = false, ...avatarProps}: Props) => {
    const {localImage, onEditPress} = useActionSheetUpdateAvatar({
      onChange,
      uri,
    });

    return (
      <View style={containerStyle}>
        <Avatar {...avatarProps} uri={localImage?.path ?? uri} />
        <Touchable
          style={styles.penWrapper}
          onPress={onEditPress}
          disabled={loading}
          hitSlop={MIDDLE_BUTTON_HIT_SLOP}>
          {loading ? (
            <ActivityIndicator style={styles.activityIndicator} />
          ) : (
            <CameraIcon />
          )}
        </Touchable>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  penWrapper: {
    position: 'absolute',
    bottom: -rem(10),
    right: -rem(10),
    alignItems: 'center',
    justifyContent: 'center',
    width: PEN_SIZE,
    height: PEN_SIZE,
    borderRadius: PEN_SIZE / 2,
    backgroundColor: COLORS.white,
    marginHorizontal: rem(10),
    marginVertical: rem(10),
  },
  activityIndicator: {
    ...StyleSheet.absoluteFillObject,
  },
});
