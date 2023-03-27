// SPDX-License-Identifier: ice License 1.0

import {ActivityIndicator} from '@components/ActivityIndicator';
import {RefreshIceIcon} from '@components/RefreshControl';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {NEWS_LOAD_LIMIT} from '@store/modules/News/sagas/loadNewsSaga';
import {NewsSelectors} from '@store/modules/News/selectors';
import {NoMoreNewsIcon} from '@svg/NoMoreNewsIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useCallback, useMemo} from 'react';
import {ListRenderItem, StyleSheet, Text, View} from 'react-native';
import {
  interpolate,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

import {
  FEATURED_HEADER_COLLAPSED_HEIGHT,
  FEATURED_HEADER_EXPANDED_HEIGHT,
  FeaturedNewsArticle,
} from './components/FeaturedNewsArticle';
import {NewsArticle, NewsArticleSkeleton} from './components/NewsArticle';
import {useOnRefresh} from './hooks/useOnRefresh';

export const News = () => {
  useFocusStatusBar({style: 'light-content'});

  const safeAreaInsets = useSafeAreaInsets();

  const frame = useSafeAreaFrame();

  const tabBarOffset = useBottomTabBarOffsetStyle();

  const animatedIndex = useSharedValue(0);

  const translateY = useDerivedValue(() =>
    interpolate(animatedIndex.value, [0, 0.1], [0, 100]),
  );

  const {refreshing, onLoadMore} = useOnRefresh(animatedIndex);

  const hasMoreNews = useSelector(NewsSelectors.hasMoreToLoad);

  const data = useSelector(NewsSelectors.getNewsIds);

  const snapPoints = useMemo(() => {
    const collapsed = frame.height - FEATURED_HEADER_EXPANDED_HEIGHT;

    const expanded =
      frame.height - safeAreaInsets.top - FEATURED_HEADER_COLLAPSED_HEIGHT;

    return [collapsed, expanded];
  }, [frame.height, safeAreaInsets.top]);

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
      <View style={styles.headerBox}>
        <Text style={styles.newsFeed}>{t('news.news_feed')}</Text>
      </View>
    );
  }, []);

  const renderFooter = useCallback(() => {
    if (refreshing) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator theme={'light-content'} />
        </View>
      );
    }

    if (!hasMoreNews && data.length > 0) {
      return (
        <View style={styles.noMoreContainer}>
          <NoMoreNewsIcon
            style={styles.noMorImage}
            width={rem(33)}
            height={rem(33)}
            color={COLORS.periwinkleGray}
          />

          <Text style={styles.noMoreText}>{t('news.no_more_news')}</Text>
        </View>
      );
    }

    return null;
  }, [data.length, hasMoreNews, refreshing]);

  const renderItem: ListRenderItem<typeof data[0]> = useCallback(({item}) => {
    return <NewsArticle newsArticleId={item} />;
  }, []);

  return (
    <View style={styles.container}>
      <FeaturedNewsArticle animatedIndex={animatedIndex} />

      <View style={styles.refreshIceIconContainer}>
        <RefreshIceIcon
          theme={'dark-content'}
          refreshing={refreshing}
          translateY={translateY}
        />
      </View>

      <BottomSheet
        snapPoints={snapPoints}
        handleComponent={null}
        handleHeight={0}
        animateOnMount={false}
        enableOverDrag
        animatedIndex={animatedIndex}
        overDragResistanceFactor={10}
        backgroundStyle={[
          commonStyles.baseSubScreen,
          styles.bottomSheetBackgroundStyle,
        ]}
        activeOffsetY={[-5, 5]}>
        <BottomSheetFlatList
          style={styles.flatList}
          contentContainerStyle={tabBarOffset.current}
          data={data}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyList}
          onEndReached={onLoadMore}
          showsVerticalScrollIndicator={false}
          overScrollMode={'never'}
          alwaysBounceVertical={false}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },

  refreshIceIconContainer: {
    height: 0,
  },

  bottomSheetBackgroundStyle: {
    borderTopLeftRadius: rem(24),
    borderTopRightRadius: rem(24),
  },

  flatList: {
    flex: 1,
  },

  headerBox: {
    paddingTop: rem(28),
    paddingHorizontal: rem(24),
    paddingBottom: rem(16),
  },

  newsFeed: {
    ...font(15, 16, 'semibold', 'primaryDark'),
  },

  footerLoader: {
    marginVertical: rem(16),
    alignSelf: 'center',
  },

  noMoreContainer: {
    margin: rem(16),
    paddingHorizontal: rem(16),
    paddingVertical: rem(10),
    alignSelf: 'center',
  },
  noMorImage: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  noMoreText: {
    ...font(13, 15.6, 'medium', 'periwinkleGray'),
  },
});
