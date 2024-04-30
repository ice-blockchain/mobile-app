// SPDX-License-Identifier: ice License 1.0

import {SMS_EMAIL_RESEND_TIMEOUT_SEC} from '@constants/timeouts';
import {useCountdown} from '@hooks/useCountdown';
import {dayjs} from '@services/dayjs';
import {useMemo} from 'react';

type Params = {
  lastSendTimestamp: number | null;
};

export const useResendCountdown = ({lastSendTimestamp}: Params) => {
  const resendDuration = useMemo(
    () =>
      dayjs.duration(
        lastSendTimestamp
          ? SMS_EMAIL_RESEND_TIMEOUT_SEC - dayjs().diff(lastSendTimestamp, 's')
          : 0,
        's',
      ),
    [lastSendTimestamp],
  );

  const {durationLeft, isCountdownOver} = useCountdown(resendDuration);

  return {
    resendAvailable: isCountdownOver,
    resendTimeout: durationLeft,
  };
};
