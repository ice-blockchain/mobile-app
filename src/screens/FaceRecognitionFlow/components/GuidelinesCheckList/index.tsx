// SPDX-License-Identifier: ice License 1.0

import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
};

const checks = [
  t('face_auth.selfie_guidelines.check_1'),
  t('face_auth.selfie_guidelines.check_2'),
  t('face_auth.selfie_guidelines.check_3'),
  t('face_auth.selfie_guidelines.check_4'),
  t('face_auth.selfie_guidelines.check_5'),
  t('face_auth.selfie_guidelines.check_6'),
];

export const GuidelinesCheckList = ({containerStyle}: Props) => {
  return (
    <View style={containerStyle}>
      {checks.map((check, index) => (
        <Text key={index} style={styles.checkText}>
          {check}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  checkText: {
    ...font(14, 20, 'medium', 'secondary'),
    marginVertical: rem(3),
  },
});
