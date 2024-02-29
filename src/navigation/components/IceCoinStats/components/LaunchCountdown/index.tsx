// SPDX-License-Identifier: ice License 1.0

import {MAINNET_LAUNCH_DATE} from '@constants/mainnet';
import {useCountdown} from '@hooks/useCountdown';
import {TimerPart} from '@navigation/components/IceCoinStats/components/LaunchCountdown/components/TimerPart';
import {dayjs} from '@services/dayjs';
import {RocketIcon} from '@svg/new/Rocket';
import {font} from '@utils/styles';
import React, {memo, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const LaunchCountdown = memo(() => {
  const launchDuration = useMemo(() => {
    return dayjs.duration(dayjs(MAINNET_LAUNCH_DATE).diff());
  }, []);

  const {durationLeft, isCountdownOver} = useCountdown(launchDuration);

  const days = isCountdownOver ? 0 : Math.floor(durationLeft.asDays());
  const hours = isCountdownOver ? 0 : durationLeft.hours();
  const minutes = isCountdownOver ? 0 : durationLeft.minutes();
  const seconds = isCountdownOver ? 0 : durationLeft.seconds();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <RocketIcon />
        <Text style={styles.headerText}>Ice Mainnet Launch</Text>
      </View>
      <View style={styles.timer}>
        <TimerPart label={'days'} value={days} />
        <TimerPart label={'hours'} value={hours} />
        <TimerPart label={'min'} value={minutes} />
        <TimerPart label={'sec'} value={seconds} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: rem(10),
    marginBottom: rem(34),
  },
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
