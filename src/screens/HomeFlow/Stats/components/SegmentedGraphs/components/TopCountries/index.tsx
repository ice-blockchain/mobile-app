// SPDX-License-Identifier: ice License 1.0

import {CountryStatistics} from '@api/statistics/types';
import {CountryListItem} from '@components/ListItems/CountryListItem';
import {ListItemSkeleton} from '@components/ListItems/ListItemSkeleton';
import {SectionHeader} from '@components/SectionHeader';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useFetchCollection} from '@hooks/useFetchCollection';
import {HomeTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CollectionActions} from '@store/modules/Collections';
import {collectionSelector} from '@store/modules/Collections/selectors';
import {t} from '@translations/i18n';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {InteractionManager, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const COUNTRIES_COUNT = 5;

const SKELETONS = Array(COUNTRIES_COUNT)
  .fill(null)
  .map((_, index) => <ListItemSkeleton key={index} />);

/**
 * Not used
 */
export const TopCountries = memo(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeTabStackParamList>>();

  const onSeeAllPress = useCallback(() => {
    // navigation.navigate('TopCountries');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const {data, fetch, hasNext} = useFetchCollection({
    selector: collectionSelector('topStatsCountries'),
    action: CollectionActions.GET_TOP_STATS_COUNTRIES,
    options: {pageSize: COUNTRIES_COUNT},
  });

  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      fetch({isInitial: true});
    });
    return () => interactionPromise.cancel();
  }, [fetch]);

  const [displayData, setDisplayData] = useState<CountryStatistics[]>([]);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setDisplayData(data);
    });
    return () => cancelAnimationFrame(handle);
  }, [data]);

  return (
    <View style={styles.container}>
      <SectionHeader
        title={t('stats.top_countries')}
        action={t('button.see_all')}
        onActionPress={onSeeAllPress}
      />
      <View style={styles.list}>
        {hasNext && !displayData.length
          ? SKELETONS
          : displayData.map(country => (
              <CountryListItem
                key={country.country}
                code={country.country}
                userCount={country.userCount}
              />
            ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: rem(12),
  },
  list: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
});
