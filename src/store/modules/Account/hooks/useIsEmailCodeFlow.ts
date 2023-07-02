// SPDX-License-Identifier: ice License 1.0

import {authConfigSelector} from '@store/modules/Account/selectors';
import {deviceLocationSelector} from '@store/modules/Devices/selectors';
import {checkProp} from '@utils/guards';
import {useSelector} from 'react-redux';

export const useIsEmailCodeFlow = () => {
  const authConfig = useSelector(authConfigSelector);
  const deviceLocation = useSelector(deviceLocationSelector);

  if (authConfig && deviceLocation) {
    if (checkProp(authConfig, 'emailCodeAuthWhiteList')) {
      return authConfig.emailCodeAuthWhiteList.some(
        country =>
          country.toLowerCase() === deviceLocation.country.toLowerCase(),
      );
    }

    if (checkProp(authConfig, 'emailCodeAuthBlackList')) {
      return !authConfig.emailCodeAuthBlackList.some(
        country =>
          country.toLowerCase() === deviceLocation.country.toLowerCase(),
      );
    }
  }

  return false;
};
