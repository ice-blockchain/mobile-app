// SPDX-License-Identifier: ice License 1.0

import {isSplashHiddenSelector} from '@store/modules/AppCommon/selectors';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {canAskPermissionSelector} from '@store/modules/Permissions/selectors';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export function useRequestNotificationPermissions() {
  const dispatch = useDispatch();
  const isSplashHidden = useSelector(isSplashHiddenSelector);
  const canAskNotificationPermission = useSelector(
    canAskPermissionSelector('pushNotifications'),
  );

  useEffect(() => {
    if (canAskNotificationPermission && isSplashHidden) {
      dispatch(
        PermissionsActions.GET_PERMISSIONS.START.create('pushNotifications'),
      );
    }
  }, [canAskNotificationPermission, dispatch, isSplashHidden]);
}
