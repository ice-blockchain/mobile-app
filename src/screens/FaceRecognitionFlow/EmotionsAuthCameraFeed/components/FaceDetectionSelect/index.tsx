// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onFaceDetectionSelected: (useFaceDetection: boolean) => void;
};

export function FaceDetectionSelect({onFaceDetectionSelected}: Props) {
  return (
    <View style={commonStyles.flexOne}>
      <Header
        color={COLORS.primaryDark}
        title={t('face_auth.header')}
        backgroundColor={'transparent'}
      />
      <View style={styles.statusButtonContainer}>
        <Touchable
          onPress={() => onFaceDetectionSelected(true)}
          style={[styles.statusButton]}>
          <Text style={styles.statusText}>With Face Detection</Text>
        </Touchable>
      </View>
      <View style={styles.statusButtonContainer}>
        <Touchable
          onPress={() => onFaceDetectionSelected(false)}
          style={[styles.statusButton]}>
          <Text style={styles.statusText}>Without Face Detection</Text>
        </Touchable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusButton: {
    height: rem(40),
    width: rem(240),
    borderRadius: rem(12),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  statusText: {
    marginStart: rem(8),
    ...font(14, 20, 'black', 'white', 'center'),
  },
});
