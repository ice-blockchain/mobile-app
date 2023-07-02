// SPDX-License-Identifier: ice License 1.0

import {authConfigSelector} from '@store/modules/Account/selectors';
import {deviceLocationSelector} from '@store/modules/Devices/selectors';
import {checkProp} from '@utils/guards';
import {useSelector} from 'react-redux';

export const useIsCustomEmailFlow = () => {
  const authConfig = useSelector(authConfigSelector);
  const deviceLocation = useSelector(deviceLocationSelector);

  if (authConfig && deviceLocation) {
    if (checkProp(authConfig, 'customEmailAuthWhiteList')) {
      return authConfig.customEmailAuthWhiteList.some(
        country =>
          country.toLowerCase() === deviceLocation.country.toLowerCase(),
      );
    }

    if (checkProp(authConfig, 'customEmailAuthBlackList')) {
      return !authConfig.customEmailAuthBlackList.some(
        country =>
          country.toLowerCase() === deviceLocation.country.toLowerCase(),
      );
    }
  }

  return false;
};
