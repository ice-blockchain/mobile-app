// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {MiningButtonConfig} from '@navigation/components/MainTabBar/components/TabBarMiningItem/config';
import {AccountActions} from '@store/modules/Account/actions';
import {userSelector} from '@store/modules/Account/selectors';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {miningStateSelector} from '@store/modules/Tokenomics/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {call} from 'redux-saga/effects';

export const useMiningState = () => {
  const dispatch = useDispatch();

  const user = useSelector(userSelector);

  const miningState = useSelector(miningStateSelector);

  const miningStateTooltipSeen =
    user?.clientData?.miningStateTooltipSeen?.includes(miningState);

  const setMiningStateTooltipSeen = (
    currentUser: User,
    seenMiningState: string,
  ) => {
    dispatch(
      AccountActions.UPDATE_ACCOUNT.START.create(
        {
          clientData: {
            ...currentUser?.clientData,
            miningStateTooltipSeen: [
              ...(currentUser.clientData?.miningStateTooltipSeen ?? []),
              seenMiningState,
            ],
          },
        },
        function* (freshUser) {
          if (
            !freshUser.clientData?.miningStateTooltipSeen?.includes(
              seenMiningState,
            )
          ) {
            yield call(setMiningStateTooltipSeen, freshUser, seenMiningState);
          }
          return {retry: false};
        },
      ),
    );
  };

  const startMiningSession = ({
    tapToMineActionType,
  }: {
    tapToMineActionType: 'Extended' | 'Default';
  }) => {
    dispatch(
      TokenomicsActions.START_MINING_SESSION.START.create({
        tapToMineActionType,
      }),
    );
  };

  const closeTooltip = () => {
    user && setMiningStateTooltipSeen(user, miningState);
  };

  const stateConfig = MiningButtonConfig[miningState];

  return {
    stateConfig,
    miningStateTooltipSeen,
    startMiningSession,
    closeTooltip,
  };
};
