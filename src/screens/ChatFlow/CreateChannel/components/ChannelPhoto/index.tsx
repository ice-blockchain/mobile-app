// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {
  CroppedImage,
  useActionSheetUpdateAvatar,
} from '@hooks/useActionSheetUpdateAvatar';
import {CameraIcon} from '@svg/CameraIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useCallback, useMemo, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const CHANNEL_PHOTO_SIZE = rem(110);

export const ChannelPhoto = () => {
  const [uri, setUri] = useState('');

  const onChange = useCallback((image: CroppedImage | null) => {
    setUri(image?.path ?? '');
  }, []);

  const {onEditPress, localImage} = useActionSheetUpdateAvatar({
    title: t('chat.create_channel.add_channel_photo'),
    onChange,
    uri,
  });

  const imageSource = useMemo(() => {
    const currentUri = uri || localImage?.path;

    if (!currentUri) {
      return null;
    }

    return {
      uri: currentUri,
    };
  }, [localImage?.path, uri]);

  return (
    <Touchable style={styles.container} onPress={onEditPress}>
      <View style={styles.photoContainer}>
        {imageSource ? (
          <Image
            style={styles.photo}
            source={imageSource}
            resizeMode={'cover'}
          />
        ) : (
          <View style={styles.photo}>
            <CameraIcon width={rem(36)} height={rem(36)} />
          </View>
        )}
      </View>

      <Text style={styles.text}>
        {imageSource
          ? t('chat.create_channel.buttons.change_photo')
          : t('chat.create_channel.buttons.add_photo')}
      </Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  photoContainer: {
    width: CHANNEL_PHOTO_SIZE,
    height: CHANNEL_PHOTO_SIZE,
    borderRadius: rem(20),
    borderWidth: rem(4.5),
    borderColor: COLORS.white,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  photo: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondaryFaint,
  },

  text: {
    marginTop: rem(8),
    ...font(17, 20.4, '600', 'white'),
  },
});
