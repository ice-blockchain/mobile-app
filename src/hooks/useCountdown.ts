// SPDX-License-Identifier: ice License 1.0

import {Duration} from 'dayjs/plugin/duration';
import {useEffect, useRef, useState} from 'react';

export const useCountdown = (duration: Duration) => {
  const initialized = useRef(false);
  const [durationLeft, setDurationLeft] = useState<Duration>(duration.clone());
  const isCountdownOver = durationLeft.asMilliseconds() <= 0;
  const [isStopped, setIsStopped] = useState(false);

  useEffect(() => {
    if (initialized.current) {
      setDurationLeft(duration.clone());
    } else {
      initialized.current = true;
    }
  }, [duration]);

  useEffect(() => {
    if (!isCountdownOver && !isStopped) {
      const interval = setInterval(() => {
        setDurationLeft(left => left.subtract(1, 's'));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isCountdownOver, isStopped]);

  const resetTimer = () => {
    setDurationLeft(duration.clone());
  };

  const stopCountdown = () => {
    setIsStopped(true);
  };

  return {durationLeft, isCountdownOver, resetTimer, stopCountdown, isStopped};
};
