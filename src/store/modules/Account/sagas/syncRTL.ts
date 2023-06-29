// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {isRTL} from '@translations/i18n';
import {localeConfig} from '@translations/localeConfig';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';

/**
 * Check the locale change and restart the app
 */
export function* syncRtlSaga(
  action: ReturnType<typeof AccountActions.SYNC_LANGUAGES.SUCCESS.create>,
) {
  const {oldLocale, newLocale} = action.payload;

  if (newLocale) {
    if (localeConfig[newLocale].isRTL !== isRTL) {
      I18nManager.forceRTL(localeConfig[newLocale].isRTL);
      RNRestart.restart();
      return;
    }
  }

  if (oldLocale && newLocale && oldLocale !== newLocale) {
    RNRestart.restart();
  }
}
