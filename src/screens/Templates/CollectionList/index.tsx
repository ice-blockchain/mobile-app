// SPDX-License-Identifier: ice License 1.0

import {SearchInput} from '@components/Inputs/SearchInput';
import {ListItemSkeleton} from '@components/ListItems/ListItemSkeleton';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useFetchCollection} from '@hooks/useFetchCollection';
import {Header} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {RootState} from '@store/rootReducer';
import {ActionFactories} from '@store/utils/actions/createAction';
import {MagnifierZoomOutEmptyIcon} from '@svg/MagnifierZoomOutEmptyIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import debounce from 'lodash/debounce';
import React, {useCallback, useEffect, useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {rem} from 'rn-units';

type Props<T> = {
  headerTitle: string;
  searchPlaceholder: string;
  selector: (state: RootState) => {
    data: T[];
    hasNext: boolean;
    query?: string;
    nextOffset: number;
  };
  action: ActionFactories<
    string,
    {
      START: (params: {
        isInitial: boolean;
        limit?: number;
        query?: string;
      }) => unknown;
    }
  >;
  renderItem: ListRenderItem<T>;
};

const ICON_SIZE = rem(28);
const VIEW_PORT_ITEMS_SIZE = 12;

export const CollectionList = <T,>({
  headerTitle,
  searchPlaceholder,
  selector,
  action,
  renderItem,
}: Props<T>) => {
  useFocusStatusBar({style: 'dark-content'});
  const tabbarOffset = useBottomTabBarOffsetStyle();

  const {
    data,
    hasNext,
    fetch,
    refresh,
    refreshing,
    loadNext,
    loadNextLoading,
    loading,
  } = useFetchCollection<T>({selector, action});

  useEffect(() => {
    fetch({isInitial: true});
  }, [fetch]);

  const search = useMemo(
    () => debounce((query: string) => fetch({query, isInitial: true}), 600),
    [fetch],
  );

  const renderEmptyList = useCallback(() => {
    if (loading) {
      return (
        <>
          {Array(VIEW_PORT_ITEMS_SIZE)
            .fill(null)
            .map((_, index) => (
              <ListItemSkeleton key={index} />
            ))}
        </>
      );
    }
    return (
      <View style={styles.emptyList}>
        {hasNext ? (
          Array(5)
            .fill(null)
            .map((_, index) => <ListItemSkeleton key={index} />)
        ) : (
          <View style={styles.emptyContainer}>
            <MagnifierZoomOutEmptyIcon
              width={ICON_SIZE}
              height={ICON_SIZE}
              color={COLORS.secondary}
            />
            <Text style={styles.emptyContainerText}>
              {t('search.nothing_is_found')}
            </Text>
          </View>
        )}
      </View>
    );
  }, [loading, hasNext]);

  return (
    <View style={styles.container}>
      <Header title={headerTitle} />
      <SearchInput
        containerStyle={styles.searchInput}
        placeholder={searchPlaceholder}
        onChangeText={search}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[tabbarOffset.current, styles.listContent]}
        data={data}
        keyboardDismissMode={'on-drag'}
        renderItem={renderItem}
        onEndReached={loadNext}
        onRefresh={refresh}
        refreshing={refreshing}
        ListFooterComponent={loadNextLoading ? ActivityIndicator : null}
        ListEmptyComponent={renderEmptyList}
        initialNumToRender={20}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginVertical: rem(8),
  },
  emptyList: {
    marginTop: rem(8),
  },
  listContent: {
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: -rem(8),
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: rem(200),
  },
  emptyContainerText: {
    ...font(14, 19, 'medium', 'secondary', 'center'),
    paddingTop: rem(16),
    paddingHorizontal: SCREEN_SIDE_OFFSET,
  },
});
