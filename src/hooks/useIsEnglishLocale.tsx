// SPDX-License-Identifier: ice License 1.0

import {appLocaleSelector} from '@store/modules/Account/selectors';
import {useSelector} from 'react-redux';

/*
  For other than english locales we specify a custom style in some places.
 */
export function useIsEnglishLocale() {
  const locale = useSelector(appLocaleSelector);
  return locale === 'en';
}
