// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {TopCountriesItem} from '@screens/Stats/components/TopCountriesItem';
import {Search} from '@screens/Team/components/Search';
import {StatisticsActions} from '@store/modules/Statistics/actions';
import {
  searchedCountriesSelector,
  topCoutriesSelector,
} from '@store/modules/Statistics/selectors';
import {TopCountriesIcon} from '@svg/TopCountriesIcon';
import {t} from '@translations/i18n';
import {throttle} from 'lodash';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

interface TopCountriesScreenProps {}

export const TopCountriesScreen = ({}: TopCountriesScreenProps) => {
  const {scrollHandler, shadowStyle} = useScrollShadow();
  const tabbarOffset = useBottomTabBarOffsetStyle();
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();

  const topCoutries = useSelector(topCoutriesSelector);
  const searchedCountries = useSelector(searchedCountriesSelector);

  const countries = query ? searchedCountries : topCoutries;

  const search = throttle((searchQuery: string) => {
    dispatch(StatisticsActions.SEARCH_COUNTRIES.START.create(searchQuery));
  }, 600);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearch = useCallback(search, []);

  useEffect(() => {
    onSearch(query);
  }, [onSearch, query]);

  const loadMore = () => {};

  const renderItem = ({
    item,
    index,
  }: {
    item: {
      icon: string;
      countryName: string;
      users: number;
    };
    index: number;
  }) => {
    return (
      <TopCountriesItem
        icon={item.icon}
        countryName={item.countryName}
        users={item.users}
        topBorder={index === 0}
        bottomBorder={index === countries.length - 1}
        style={commonStyles.shadow}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.darkBlue}
        backgroundColor={COLORS.white}
        title={t('stats.top_countries')}
        titleOffset={rem(7)}
        icon={<TopCountriesIcon />}
      />
      <Animated.FlatList
        onScroll={scrollHandler}
        data={countries}
        renderItem={renderItem}
        keyExtractor={item => item.countryName}
        ListHeaderComponent={
          <Search
            value={query}
            onChangeText={setQuery}
            style={styles.search}
            placeholderTextColor={COLORS.greyText}
            iconColor={COLORS.greyText}
          />
        }
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.content, tabbarOffset.current]}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginHorizontal: 24,
    borderRadius: 16,
  },
  search: {
    marginBottom: 20,
    backgroundColor: COLORS.wildSand,
    marginTop: rem(10),
  },
});
