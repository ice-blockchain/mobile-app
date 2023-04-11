// SPDX-License-Identifier: ice License 1.0

import {createAction} from '@store/utils/actions/createAction';
import {SupportedLocale} from '@translations/localeConfig';

const UPDATE_LAST_USED_IN_APP_LOCALE = createAction(
  'UPDATE_LAST_USED_IN_APP_LOCALE',
  {
    STATE: (lastUsedInAppLocale?: SupportedLocale) => ({
      lastUsedInAppLocale,
    }),
  },
);

const UPDATE_LAST_USED_PHONE_LOCALE = createAction(
  'UPDATE_LAST_USED_PHONE_LOCALE',
  {
    STATE: (lastUsedPhoneLocale?: SupportedLocale) => ({
      lastUsedPhoneLocale,
    }),
  },
);

export const LanguageActions = Object.freeze({
  UPDATE_LAST_USED_IN_APP_LOCALE,
  UPDATE_LAST_USED_PHONE_LOCALE,
});
