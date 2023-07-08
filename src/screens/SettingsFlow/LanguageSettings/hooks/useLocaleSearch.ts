// SPDX-License-Identifier: ice License 1.0

import {
  LocalConfig,
  localeConfig,
  SupportedLocale,
} from '@translations/localeConfig';
import {debounce} from 'lodash';
import {useEffect, useMemo, useState} from 'react';

export const useLocaleSearch = (availableLocales: SupportedLocale[]) => {
  const [locales, setLocales] = useState<SupportedLocale[]>([]);

  useEffect(() => {
    const sortedKeys = sortLocales(availableLocales);
    setLocales(sortedKeys);
  }, [availableLocales]);

  const searchLocales = useMemo(
    () =>
      debounce((term: string) => {
        const filtered = term
          ? availableLocales.filter(l =>
              localeConfig[l].name.toLowerCase().includes(term.toLowerCase()),
            )
          : availableLocales;

        const sorted = sortLocales(filtered);
        setLocales(sorted);
      }, 600),
    [availableLocales],
  );

  return {
    locales,
    searchLocales,
  };
};

const sortLocales = (localesToSort: SupportedLocale[]) => {
  const sorted: LocalConfig = localesToSort
    .filter(locale => localeConfig[locale])
    .sort((a, b) => localeConfig[a].name.localeCompare(localeConfig[b].name))
    .reduce((result, locale) => {
      result[locale] = localeConfig[locale];
      return result;
    }, {} as LocalConfig);

  const sortedKeys: SupportedLocale[] = Object.keys(
    sorted,
  ) as SupportedLocale[];
  return sortedKeys;
};
