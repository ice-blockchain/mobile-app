// SPDX-License-Identifier: ice License 1.0

import {useFocusEffect} from '@react-navigation/native';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {UsersActions} from '@store/modules/Users/actions';
import {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';

export const useFetchData = ({
  userId,
  isOwner,
}: {
  userId: string;
  isOwner: boolean;
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isOwner) {
      dispatch(
        TokenomicsActions.GET_RANKING_SUMMARY.START.create({
          userId,
        }),
      );
      dispatch(UsersActions.GET_USER_BY_ID.START.create(userId));
    }
  }, [userId, dispatch, isOwner]);

  useFocusEffect(
    useCallback(() => {
      dispatch(AchievementsActions.USER_ACHIEVEMENTS_LOAD.START.create(userId));
    }, [dispatch, userId]),
  );
};
