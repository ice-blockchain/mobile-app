// SPDX-License-Identifier: ice License 1.0

import {SupportedLocale} from '@translations/localeConfig';
import {debounce} from 'lodash';
import {useMemo, useState} from 'react';

export const useLocaleSearch = (availableLocales: SupportedLocale[]) => {
  const [locales, setLocales] = useState(availableLocales);

  const searchLocales = useMemo(
    () =>
      debounce((term: string) => {
        setLocales(
          term
            ? availableLocales.filter(l =>
                l.toLowerCase().includes(term.toLowerCase()),
              )
            : availableLocales,
        );
      }, 600),
    [availableLocales],
  );

  return {
    locales,
    searchLocales,
  };
};
