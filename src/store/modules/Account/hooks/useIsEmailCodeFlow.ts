// SPDX-License-Identifier: ice License 1.0

import {authConfigSelector} from '@store/modules/Account/selectors';
import {deviceLocationSelector} from '@store/modules/Devices/selectors';
import {checkProp} from '@utils/guards';
import RNLocalize from 'react-native-localize';
import {useSelector} from 'react-redux';

export const useIsEmailCodeFlow = () => {
  const authConfig = useSelector(authConfigSelector);
  const deviceSettingsCountry = RNLocalize.getCountry();
  const deviceLocation = useSelector(deviceLocationSelector);
  const deviceCountry =
    deviceSettingsCountry === ''
      ? deviceLocation?.country
      : deviceSettingsCountry;

  if (authConfig && deviceCountry) {
    if (checkProp(authConfig, 'emailCodeAuthWhiteList')) {
      return authConfig.emailCodeAuthWhiteList.some(
        country => country.toLowerCase() === deviceCountry.toLowerCase(),
      );
    }

    if (checkProp(authConfig, 'emailCodeAuthBlackList')) {
      return !authConfig.emailCodeAuthBlackList.some(
        country => country.toLowerCase() === deviceCountry.toLowerCase(),
      );
    }
  }

  return false;
};
