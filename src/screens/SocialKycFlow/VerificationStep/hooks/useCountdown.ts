// SPDX-License-Identifier: ice License 1.0

import {useCallback, useEffect, useRef, useState} from 'react';

export function useCountdown({
  startingValueInSeconds,
}: {
  startingValueInSeconds: number;
}) {
  const [countdown, setCountdown] = useState(startingValueInSeconds);
  const countdownIntervalRef = useRef<NodeJS.Timer | undefined>();

  const stopCountdown = useCallback(() => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = undefined;
    }
  }, []);

  useEffect(() => {
    stopCountdown();
  }, [stopCountdown]);

  const startCountdown = useCallback(() => {
    countdownIntervalRef.current = setInterval(
      () =>
        setCountdown(value => {
          if (value > 0) {
            return value - 1;
          }
          stopCountdown();
          return 0;
        }),
      1000,
    );
  }, [stopCountdown]);

  return {countdown, startCountdown, stopCountdown};
}
