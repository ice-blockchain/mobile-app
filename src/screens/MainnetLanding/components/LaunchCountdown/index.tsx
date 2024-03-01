// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {MAINNET_LAUNCH_DATE} from '@constants/mainnet';
import {useCountdown} from '@hooks/useCountdown';
import {TimerPart} from '@screens/MainnetLanding/components/LaunchCountdown/components/TimerPart';
import {useContainerOffset} from '@screens/MainnetLanding/components/LaunchCountdown/hooks/useContainerOffset';
import {dayjs} from '@services/dayjs';
import {RocketIcon} from '@svg/Rocket';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {rem} from 'rn-units';

export const LaunchCountdown = memo(() => {
  const launchDuration = useMemo(() => {
    return dayjs.duration(dayjs(MAINNET_LAUNCH_DATE).diff());
  }, []);

  const {durationLeft, isCountdownOver} = useCountdown(launchDuration);

  const containerOffset = useContainerOffset();

  const days = isCountdownOver ? 0 : Math.floor(durationLeft.asDays());
  const hours = isCountdownOver ? 0 : durationLeft.hours();
  const minutes = isCountdownOver ? 0 : durationLeft.minutes();
  const seconds = isCountdownOver ? 0 : durationLeft.seconds();

  return (
    <View style={containerOffset.current}>
      <LinearGradient
        colors={[COLORS.toreaBay, COLORS.primaryLight]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.header}>
        <RocketIcon />
        <Text style={styles.headerText}>
          {t('mainnet_landing.countdown.header')}
        </Text>
      </View>
      <View style={styles.timer}>
        <TimerPart label={t('general.day', {count: days})} value={days} />
        <TimerPart label={t('general.hour', {count: days})} value={hours} />
        <TimerPart label={t('general.minutes_abbr')} value={minutes} />
        <TimerPart label={t('general.seconds_abbr')} value={seconds} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    marginStart: rem(8),
    ...font(13, undefined, 'bold', 'white', 'center'),
  },
  timer: {
    marginTop: rem(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
