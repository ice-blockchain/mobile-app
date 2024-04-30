// SPDX-License-Identifier: ice License 1.0

import {PermissionsActions} from '@store/modules/Permissions/actions';
import {isPermissionGrantedSelector} from '@store/modules/Permissions/selectors';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useCameraPermissions = () => {
  const dispatch = useDispatch();
  const permissionsGranted = useSelector(isPermissionGrantedSelector('camera'));

  useEffect(() => {
    if (!permissionsGranted) {
      dispatch(PermissionsActions.GET_PERMISSIONS.START.create('camera'));
    }
  }, [dispatch, permissionsGranted]);

  return {permissionsGranted};
};
