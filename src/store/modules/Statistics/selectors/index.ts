// SPDX-License-Identifier: BUSL-1.1

import {countriesCode} from '@constants/countries';
import {RootState} from '@store/rootReducer';

export const topCoutriesSelector = (state: RootState) => {
  return state.statistics.topCountries.map(topCountry => {
    const country = countriesCode.find(c => c.isoCode === topCountry.country);

    return {
      icon: country?.flag ?? '',
      countryName: country?.name ?? '',
      users: topCountry.userCount,
    };
  });
};

export const topFiveCoutriesSelector = (state: RootState) => {
  const topCoutries = topCoutriesSelector(state);

  return topCoutries.filter((i, index) => index < 5);
};

export const searchedCountriesSelector = (state: RootState) => {
  return state.statistics.searchedCountries.map(topCountry => {
    const country = countriesCode.find(c => c.isoCode === topCountry.country);

    return {
      icon: country?.flag ?? '',
      countryName: country?.name ?? '',
      users: topCountry.userCount,
    };
  });
};
