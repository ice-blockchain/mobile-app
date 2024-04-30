// SPDX-License-Identifier: ice License 1.0

import {PopUpButton} from '@components/Buttons/PopUpButton';
import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export function CameraPermissionNotice() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.imageContainer}>
        <Image source={Images.badges.cameraPermission} />
      </View>
      <Text style={styles.title}>{t('face_auth.camera_permission.title')}</Text>
      <Text style={styles.description}>
        {t('face_auth.camera_permission.description')}
      </Text>
      <View style={styles.footerContainer}>
        <PopUpButton
          text={t('face_auth.camera_permission.action')}
          style={styles.button}
          onPress={() => Linking.openSettings()}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    alignSelf: 'center',
    paddingTop: rem(88),
  },
  title: {
    paddingTop: rem(10),
    ...font(24, 34, 'black', 'primaryDark', 'center'),
  },
  description: {
    paddingTop: rem(16),
    paddingHorizontal: rem(48),
    ...font(14, 20, 'medium', 'secondary', 'center'),
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: rem(80),
  },
  button: {
    height: rem(40),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
