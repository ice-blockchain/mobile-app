// SPDX-License-Identifier: ice License 1.0

import {RefreshControl} from '@components/RefreshControl';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {NewsActions} from '@store/modules/News/actions';
import {NEWS_LOAD_LIMIT} from '@store/modules/News/sagas/loadNewsSaga';
import {NewsSelectors} from '@store/modules/News/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useCallback, useEffect} from 'react';
import {ListRenderItem, StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

import {FeaturedNewsArticle} from './components/FeaturedNewsArticle';
import {NewsArticle, NewsArticleSkeleton} from './components/NewsArticle';
import {useScrollHandler} from './hooks/useScrollHandler';

export const News = () => {
  useFocusStatusBar({style: 'light-content'});

  const dispatch = useDispatch();

  const tabBarOffset = useBottomTabBarOffsetStyle();

  const {translateY, scrollHandler} = useScrollHandler();

  const data = useSelector(NewsSelectors.getNewsIds);

  const hasMore = useSelector(NewsSelectors.hasMoreToLoad);

  const isLoading = useSelector(
    isLoadingSelector.bind(null, NewsActions.NEWS_LOAD),
  );

  const onRefresh = useCallback(() => {
    dispatch(
      NewsActions.NEWS_LOAD.START.create({
        isRefresh: true,
      }),
    );

    dispatch(NewsActions.UNREAD_NEWS_COUNT_LOAD.START.create());
  }, [dispatch]);

  const onLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      dispatch(
        NewsActions.NEWS_LOAD.START.create({
          isRefresh: false,
        }),
      );
    }
  }, [dispatch, hasMore, isLoading]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const renderEmptyList = useCallback(() => {
    return (
      <>
        {Array(NEWS_LOAD_LIMIT)
          .fill(null)
          .map((_, index) => (
            <NewsArticleSkeleton key={index} />
          ))}
      </>
    );
  }, []);

  const renderHeader = useCallback(() => {
    return (
      <>
        <FeaturedNewsArticle />

        <View style={[commonStyles.baseSubScreen, styles.headerBox]}>
          <Text style={styles.newsFeed}>{t('news.news_feed')}</Text>
        </View>
      </>
    );
  }, []);

  const renderItem: ListRenderItem<typeof data[0]> = useCallback(({item}) => {
    return <NewsArticle newsArticleId={item} />;
  }, []);

  return (
    <Animated.FlatList
      style={styles.container}
      contentContainerStyle={tabBarOffset.current}
      data={data}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmptyList}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={scrollHandler}
      onEndReached={onLoadMore}
      refreshControl={
        <RefreshControl
          translateY={translateY}
          onRefresh={onRefresh}
          refreshing={isLoading}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  headerBox: {
    marginTop: -rem(32),
    marginBottom: -rem(16),
    paddingTop: rem(28),
    paddingLeft: rem(24),
    paddingBottom: rem(16),
  },

  newsFeed: {
    ...font(15, 16, 'semibold', 'primaryDark'),
  },
});
