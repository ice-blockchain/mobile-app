// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {AnalyticsActions} from '@store/modules/Analytics/actions';
import {balanceSummarySelector} from '@store/modules/Tokenomics/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {formatNumberString} from '@utils/numbers';
import {useDispatch, useSelector} from 'react-redux';

export const useIceBonus = () => {
  const dispatch = useDispatch();
  const user = useSelector(unsafeUserSelector);

  const loading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const balanceSummary = useSelector(balanceSummarySelector);

  const currentBalance = formatNumberString(balanceSummary?.total ?? '0');

  const finishIceBonus = (currentUser: User) => {
    const finalizedSteps =
      currentUser?.clientData?.registrationProcessFinalizedSteps ?? [];
    if (!finalizedSteps.includes('iceBonus')) {
      dispatch(
        AccountActions.UPDATE_ACCOUNT.START.create(
          {
            clientData: {
              ...currentUser.clientData,
              registrationProcessFinalizedSteps: [
                ...finalizedSteps,
                'iceBonus',
              ],
            },
          },
          function* (freshUser) {
            finishIceBonus(freshUser);
            return {retry: false};
          },
        ),
      );
    }
  };

  const onSubmit = () => {
    finishIceBonus(user);
    dispatch(AnalyticsActions.TRACK_SIGN_UP.START.create({user}));
  };

  return {
    currentBalance,
    loading,
    onSubmit,
  };
};
