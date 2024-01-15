// SPDX-License-Identifier: ice License 1.0

import {dayjs} from '@services/dayjs';
import {Duration} from 'dayjs/plugin/duration';
import {useEffect, useMemo, useRef, useState} from 'react';

export const useCountdown = (duration: Duration) => {
  const initialized = useRef(false);
  // Using endTime instead of subtraction from the initial duration
  // to handle app background case when setInterval stops
  const endTime = useMemo(() => dayjs().add(duration), [duration]);
  const [durationLeft, setDurationLeft] = useState<Duration>(duration.clone());
  const isCountdownOver = durationLeft.asMilliseconds() <= 0;

  useEffect(() => {
    if (initialized.current) {
      setDurationLeft(duration.clone());
    } else {
      initialized.current = true;
    }
  }, [duration]);

  useEffect(() => {
    if (!isCountdownOver) {
      const interval = setInterval(() => {
        setDurationLeft(dayjs.duration(endTime.diff()));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [endTime, isCountdownOver]);

  const resetTimer = () => {
    setDurationLeft(duration.clone());
  };

  return {durationLeft, isCountdownOver, resetTimer};
};
