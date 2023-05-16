// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {CameraIcon} from '@svg/CameraIcon';
import {font} from '@utils/styles';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const CHANNEL_PHOTO_SIZE = rem(110);

export const ChannelPhoto = () => {
  const [photoUri, setPhotoUri] = useState('');

  const onSelectPhoto = () => {
    setPhotoUri('https://picsum.photos/200/300');
  };

  return (
    <Touchable style={styles.container} onPress={onSelectPhoto}>
      <View style={styles.photoContainer}>
        {photoUri ? (
          <Image
            style={styles.photo}
            source={{
              uri: photoUri,
            }}
            resizeMode={'cover'}
          />
        ) : (
          <View style={styles.photo}>
            <CameraIcon width={rem(36)} height={rem(36)} />
          </View>
        )}
      </View>

      <Text style={styles.text}>
        {photoUri ? '_Change photo' : '_Add photo'}
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
    backgroundColor: '#E3EBF8',
  },

  text: {
    marginTop: rem(8),
    ...font(17, 20.4, 'semibold', 'white'),
  },
});
