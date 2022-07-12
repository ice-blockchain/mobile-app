// SPDX-License-Identifier: BUSL-1.1

import {isAuthInitializedSelector} from '@store/modules/Auth/selectors';
import {isDevicesInitializedSelector} from '@store/modules/Devices/selectors';
import {RootState} from '@store/rootReducer';
import {useSelector} from 'react-redux';

export const useIsAppInitialized = () => {
  const isAppInitialized = useSelector(
    (state: RootState) =>
      isAuthInitializedSelector(state) && isDevicesInitializedSelector(state),
  );
  return {isAppInitialized};
};
