// SPDX-License-Identifier: ice License 1.0

import {createAction} from '@store/utils/actions/createAction';
import {SupportedLocale} from '@translations/localeConfig';

const UPDATE_LAST_USED_IN_APP_LANGUAGE = createAction(
  'UPDATE_LAST_USED_IN_APP_LANGUAGE',
  {
    STATE: (lastUsedInAppLanguage?: SupportedLocale) => ({
      lastUsedInAppLanguage,
    }),
  },
);

const UPDATE_LAST_USED_PHONE_LANGUAGE = createAction(
  'UPDATE_LAST_USED_PHONE_LANGUAGE',
  {
    STATE: (lastUsedPhoneLanguage?: SupportedLocale) => ({
      lastUsedPhoneLanguage,
    }),
  },
);

export const LanguageActions = Object.freeze({
  UPDATE_LAST_USED_IN_APP_LANGUAGE,
  UPDATE_LAST_USED_PHONE_LANGUAGE,
});
