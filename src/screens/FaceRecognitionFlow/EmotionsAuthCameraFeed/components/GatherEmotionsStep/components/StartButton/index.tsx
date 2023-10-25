// SPDX-License-Identifier: ice License 1.0

import {ActivityIndicator} from '@components/ActivityIndicator';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {BackButtonIcon} from '@svg/BackButtonIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onPress: () => void;
  loading: boolean;
};

const BUTTON_SIZE = rem(64);
const ICON_CONTAINER_SIZE = rem(24);
const ICON_SIZE = rem(12);

export function StartButton({onPress, loading}: Props) {
  return (
    <Touchable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>
        {t('face_auth.emotions_recognition.start')}
      </Text>
      <View style={styles.delimiter} />
      {loading ? (
        <ActivityIndicator theme="light-content" style={styles.indicator} />
      ) : (
        <View style={styles.iconContainer}>
          <BackButtonIcon
            color={COLORS.white}
            width={ICON_SIZE}
            height={ICON_SIZE}
          />
        </View>
      )}
    </Touchable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: COLORS.white,
    paddingHorizontal: rem(68),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    ...font(17, 24, 'bold', 'primaryLight', 'center'),
  },
  delimiter: {
    width: rem(16),
  },
  iconContainer: {
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE,
    borderRadius: ICON_CONTAINER_SIZE / 2,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{scaleX: -1}],
  },
  indicator: {
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE,
  },
});
