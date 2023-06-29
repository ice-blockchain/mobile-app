// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {appLocaleSelector} from '@store/modules/Account/selectors';
import {isRTL} from '@translations/i18n';
import {localeConfig} from '@translations/localeConfig';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
import {SagaReturnType, select} from 'redux-saga/effects';

/**
 * Check the locale change and restart the app when needed (if locale.RTL !== isRTL)
 */
export function* syncRtlSaga(
  action: ReturnType<
    | typeof AccountActions.GET_ACCOUNT.SUCCESS.create
    | typeof AccountActions.UPDATE_ACCOUNT.SUCCESS.create
    | typeof AccountActions.USER_STATE_CHANGE.SUCCESS.create
  >,
) {
  const locale: SagaReturnType<typeof appLocaleSelector> = yield select(
    appLocaleSelector,
  );

  if (localeConfig[locale].isRTL !== isRTL) {
    I18nManager.forceRTL(localeConfig[locale].isRTL);

    if (action.type !== AccountActions.USER_STATE_CHANGE.SUCCESS.type) {
      RNRestart.restart();
    }
  }
}
