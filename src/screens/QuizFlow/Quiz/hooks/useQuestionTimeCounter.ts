// SPDX-License-Identifier: ice License 1.0

import {useCountdown} from '@hooks/useCountdown';
import {dayjs} from '@services/dayjs';
import {expiresAtSelector} from '@store/modules/Quiz/selectors';
import {t} from '@translations/i18n';
import {Duration} from 'dayjs/plugin/duration';
import {useMemo} from 'react';
import {useSelector} from 'react-redux';

export const useQuestionTimeCounter = () => {
  const expiresAt = useSelector(expiresAtSelector);

  const resendDuration = useMemo(() => {
    const expirationDate = dayjs(expiresAt);
    const now = dayjs();
    const secondsLeft = expirationDate.diff(now, 's');
    return dayjs.duration(secondsLeft, 's');
  }, [expiresAt]);

  const {durationLeft, isCountdownOver} = useCountdown(resendDuration);

  return {
    resendDuration,
    isCountdownOver,
    timerButtonTitle: buildTimerButtonTitle({durationLeft, isCountdownOver}),
  };
};

const buildTimerButtonTitle = ({
  durationLeft,
  isCountdownOver,
}: {
  durationLeft: Duration;
  isCountdownOver: boolean;
}) => {
  if (isCountdownOver) {
    return t('button.continue');
  }

  if (durationLeft.asMinutes() > 1) {
    return `${t(
      'button.continue',
    )} - ${durationLeft.minutes()}m ${durationLeft.seconds()}s`;
  }

  return `${t('button.continue')} - ${durationLeft.asSeconds()}s`;
};
