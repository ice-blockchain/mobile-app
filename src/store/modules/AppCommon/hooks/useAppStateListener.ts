// SPDX-License-Identifier: ice License 1.0

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {useEffect} from 'react';
import {AppState} from 'react-native';
import {useDispatch} from 'react-redux';

export const useAppStateListener = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      dispatch(AppCommonActions.APP_STATE_CHANGE.STATE.create(nextAppState));
    });

    return () => {
      subscription.remove();
    };
  }, [dispatch]);
};
