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

  const isEqualsToDeviceCountry = (country: string) => {
    return [
      deviceSettingsCountry.toLowerCase(),
      deviceLocation?.country?.toLowerCase(),
    ].includes(country.toLowerCase());
  };

  if (authConfig) {
    if (checkProp(authConfig, 'emailCodeAuthWhiteList')) {
      return authConfig.emailCodeAuthWhiteList.some(isEqualsToDeviceCountry);
    }

    if (checkProp(authConfig, 'emailCodeAuthBlackList')) {
      return !authConfig.emailCodeAuthBlackList.some(isEqualsToDeviceCountry);
    }
  }

  return false;
};
