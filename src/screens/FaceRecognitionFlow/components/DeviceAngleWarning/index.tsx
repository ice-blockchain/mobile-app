// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {EMOTION_IMAGE_SIZE} from '@screens/FaceRecognitionFlow/constants';
import {ClockIcon} from '@svg/ClockIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import {Duration} from 'dayjs/plugin/duration';
import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  countDownSecs?: Duration | null;
};

export function DeviceAngleWarning({countDownSecs, containerStyle}: Props) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image source={Images.phone.phonePosition} style={styles.image} />
      <View style={styles.body}>
        {countDownSecs && (
          <View style={styles.countDownContainer}>
            <ClockIcon
              width={rem(16)}
              height={rem(16)}
              color={COLORS.secondaryPale}
            />
            <Text style={styles.countDownText}>
              {`${countDownSecs.seconds()}${t('general.seconds_short')}`}
            </Text>
          </View>
        )}
        <Text style={styles.titleText}>
          {t('face_auth.device_angle_warning.title')}
        </Text>
        <Text style={styles.subtitleText}>
          {t('face_auth.device_angle_warning.description')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: rem(16),
    paddingHorizontal: rem(12),
    paddingVertical: rem(20),
    flexDirection: 'row',
  },
  image: {
    width: EMOTION_IMAGE_SIZE,
    height: EMOTION_IMAGE_SIZE,
  },
  body: {
    flex: 1,
    marginStart: rem(14),
    justifyContent: 'center',
  },
  countDownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rem(4),
  },
  countDownText: {
    marginStart: rem(6),
    ...font(14, 18, 'medium', 'secondaryPale'),
  },
  titleText: {
    ...font(24, 29, 'bold', 'attention'),
  },
  subtitleText: {
    ...font(13, 18, 'medium', 'primaryDark'),
  },
});
