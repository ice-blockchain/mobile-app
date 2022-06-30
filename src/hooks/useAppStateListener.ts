// SPDX-License-Identifier: BUSL-1.1

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';
import {useDispatch} from 'react-redux';

export const useAppStateListener = () => {
  const dispatch = useDispatch();

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  dispatch(AppCommonActions.APP_STATE_CHANGE.STATE.create(appStateVisible));
};
