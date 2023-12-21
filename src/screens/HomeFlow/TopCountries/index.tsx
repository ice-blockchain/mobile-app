// SPDX-License-Identifier: ice License 1.0

import {CountryStatistics} from '@api/statistics/types';
import {CountryListItem} from '@components/ListItems/CountryListItem';
import {CollectionList} from '@screens/Templates/CollectionList';
import {CollectionActions} from '@store/modules/Collections';
import {collectionSelector} from '@store/modules/Collections/selectors';
import {t} from '@translations/i18n';
import React, {memo} from 'react';

/**
 * Not used
 */
export const TopCountries = memo(() => {
  return (
    <CollectionList
      headerTitle={t('stats.top_countries')}
      searchPlaceholder={t('search.search_by_country')}
      selector={collectionSelector('statsCountriesSearch')}
      action={CollectionActions.SEARCH_STATS_COUNTRIES}
      renderItem={renderListItem}
    />
  );
});

const renderListItem = ({item}: {item: CountryStatistics}) => (
  <CountryListItem code={item.country} userCount={item.userCount} />
);
