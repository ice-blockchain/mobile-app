// SPDX-License-Identifier: BUSL-1.1

import {SpinLogoAnimation} from '@components/SpinLogoAnimation';
import {COLORS} from '@constants/colors';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
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
import debounce from 'lodash/debounce';
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

  const search = debounce((searchQuery: string) => {
    dispatch(StatisticsActions.SEARCH_COUNTRIES.START.create(searchQuery));
  }, 600);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearch = useCallback(search, []);

  useEffect(() => {
    onSearch(query);
  }, [onSearch, query]);

  const loadMore = () => {
    const offset = topCoutries.length;
    dispatch(StatisticsActions.GET_TOP_COUNTRIES.START.create({offset}));
  };

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
        ListFooterComponent={
          <View style={styles.activityIndicator}>
            <SpinLogoAnimation width={20} height={20} />
          </View>
        }
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
    marginHorizontal: SCREEN_SIDE_OFFSET,
    borderRadius: 16,
  },
  search: {
    marginBottom: rem(20),
    backgroundColor: COLORS.wildSand,
    marginTop: rem(10),
  },
  activityIndicator: {
    width: rem(25),
    height: rem(25),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: rem(10),
  },
});
