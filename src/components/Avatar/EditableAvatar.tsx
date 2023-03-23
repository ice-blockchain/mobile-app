// SPDX-License-Identifier: ice License 1.0

import {ActivityIndicator} from '@components/ActivityIndicator';
import {Avatar, AvatarProps} from '@components/Avatar/Avatar';
import {usePickImage} from '@components/Avatar/hooks/usePickImage';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BinIcon} from '@svg/BinIcon';
import {CameraIcon} from '@svg/CameraIcon';
import {ImageIcon} from '@svg/ImageIcon';
import {t} from '@translations/i18n';
import React, {memo, useEffect, useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Image as CropImage} from 'react-native-image-crop-picker';
import {rem} from 'rn-units';

const PEN_SIZE = rem(32);

type Props = {
  onChange: (image: CropImage | null) => void;
  containerStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
} & AvatarProps;

export const EditableAvatar = memo(
  ({uri, onChange, containerStyle, loading = false, ...avatarProps}: Props) => {
    const navigation =
      useNavigation<NativeStackNavigationProp<MainStackParamList>>();

    const [localImage, setLocalImage] = useState<CropImage | null>(null);

    const {openPicker} = usePickImage({
      onImageSelected: image => {
        setLocalImage(image);
        onChange(image);
      },
    });

    const onEditPress = () => {
      navigation.navigate('ActionSheet', {
        title: t('settings.profile_photo.edit'),
        buttons: [
          {
            icon: ImageIcon,
            label: t('settings.profile_photo.photo_gallery'),
            onPress: () => openPicker('gallery'),
          },
          {
            icon: CameraIcon,
            label: t('settings.profile_photo.camera'),
            onPress: () => openPicker('camera'),
          },
          {
            icon: BinIcon,
            label: t('settings.profile_photo.delete'),
            onPress: () => {
              setLocalImage(null);
              onChange(null);
            },
          },
        ],
      });
    };

    useEffect(() => {
      setLocalImage(null);
    }, [uri]);

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
    marginHorizontal: 10,
    marginVertical: 10,
  },
  activityIndicator: {
    ...StyleSheet.absoluteFillObject,
  },
});
