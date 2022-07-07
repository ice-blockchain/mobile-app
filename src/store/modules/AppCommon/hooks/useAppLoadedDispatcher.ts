// SPDX-License-Identifier: BUSL-1.1

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

export const useAppLoadedDispatcher = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AppCommonActions.APP_LOADED.STATE.create());
  }, [dispatch]);
};
