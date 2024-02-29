// SPDX-License-Identifier: ice License 1.0

import {LinkingActions} from '@store/modules/Linking/actions';
import {useEffect} from 'react';
import {Linking} from 'react-native';
import {useDispatch} from 'react-redux';

export const useOpenUrlListener = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    Linking.getInitialURL().then(url => {
      if (url) {
        dispatch(LinkingActions.HANDLE_URL.STATE.create(url, true));
      }
    });
    const subscription = Linking.addEventListener('url', ({url}) => {
      dispatch(LinkingActions.HANDLE_URL.STATE.create(url, true));
    });
    return () => subscription.remove();
  }, [dispatch]);
};
