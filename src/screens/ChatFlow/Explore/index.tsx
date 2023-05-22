// SPDX-License-Identifier: ice License 1.0

import {ListItemSkeleton} from '@components/ListItems/ListItemSkeleton';
import {SKELETONS_PER_SCREEN} from '@components/ListItems/UserListItem';
import {commonStyles} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {ItemSeparator} from '@screens/ChatFlow/components/ItemSeparator';
import {SearchBar} from '@screens/ChatFlow/components/SearchBar';
import {ExploreFilter} from '@screens/ChatFlow/Explore/components/ExploreFilter';
import {ExploreRow} from '@screens/ChatFlow/Explore/components/ExploreRow';
import {ExploreFilterType} from '@screens/ChatFlow/Explore/types';
import {useLoadChatData} from '@screens/ChatFlow/hooks/useLoadChatData';
import {SEARCH_HIDDEN_Y} from '@screens/ChatFlow/Messages/constants';
import {useAnimatedSearch} from '@screens/ChatFlow/Messages/hooks/useAnimatedSearch';
import {ChatActions} from '@store/modules/Chat/actions';
import {
  exploreDataSelector,
  exploreDataTypeSelector,
} from '@store/modules/Chat/selectors';
import {
  ChatDataType,
  ExploreData,
  ExploreDataType,
} from '@store/modules/Chat/types';
import * as React from 'react';
import {useCallback} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';

function getExploreFilterType(
  exploreDataType: ExploreDataType | null,
): ExploreFilterType {
  switch (exploreDataType) {
    case 'group':
      return 'groups';
    case 'channel':
      return 'channels';
    default:
      return 'all';
  }
}

function getExploreDataType(
  exploreFilterType: ExploreFilterType,
): ExploreDataType | null {
  switch (exploreFilterType) {
    case 'channels':
      return 'channel';
    case 'groups':
      return 'group';
    default:
      return null;
  }
}

const dataType: ChatDataType = 'explore';

export function Explore() {
  const tabBarOffset = useBottomTabBarOffsetStyle();
  const exploreData = useSelector(exploreDataSelector);
  const exploreDataType = useSelector(exploreDataTypeSelector);
  const dispatch = useDispatch();
  const {onChangeText, loading, loadMore, refreshing, refreshData} =
    useLoadChatData(dataType);

  const toggleFilter = useCallback(
    (filterType: ExploreFilterType) => {
      dispatch(
        ChatActions.SET_EXPLORE_DATA_TYPE.STATE.create({
          exploreDataType: getExploreDataType(filterType),
        }),
      );
      refreshData();
    },
    [dispatch, refreshData],
  );

  const renderItem = ({item}: {item: ExploreData}) => {
    return (
      <View key={item.id} style={commonStyles.screenPadding}>
        <ExploreRow exploreData={item} />
      </View>
    );
  };

  const {scrollHandler, animatedStyle, searchVisible} =
    useAnimatedSearch(dataType);

  return (
    <View style={commonStyles.flexOne}>
      <Animated.View
        style={[
          commonStyles.flexOne,
          animatedStyle,
          !searchVisible ? styles.animatedContainerMargin : null,
        ]}>
        <SearchBar onChangeText={onChangeText} />
        <Animated.FlatList
          style={commonStyles.flexOne}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tabBarOffset.current}
          data={exploreData}
          renderItem={renderItem}
          onEndReached={loadMore}
          onRefresh={refreshData}
          refreshing={refreshing}
          ItemSeparatorComponent={ItemSeparator}
          ListFooterComponent={
            loading && !refreshing ? ActivityIndicator : null
          }
          ListEmptyComponent={
            loading && !exploreData.length ? (
              <View style={commonStyles.screenPadding}>
                {Array(SKELETONS_PER_SCREEN)
                  .fill(null)
                  .map((_, index) => (
                    <ListItemSkeleton key={index} />
                  ))}
              </View>
            ) : null
          }
          ListHeaderComponent={
            <ExploreFilter
              toggleFilter={toggleFilter}
              selectedFilterType={getExploreFilterType(exploreDataType)}
            />
          }
          initialNumToRender={20}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  animatedContainerMargin: {
    marginBottom: SEARCH_HIDDEN_Y,
  },
});
