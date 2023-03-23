// SPDX-License-Identifier: ice License 1.0

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

export const useAppLoadedListener = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AppCommonActions.APP_LOADED.STATE.create());
  }, [dispatch]);
};
