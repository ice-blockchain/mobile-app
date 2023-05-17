// SPDX-License-Identifier: ice License 1.0

import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {ItemSeparator} from '@screens/ChatFlow/components/ItemSeparator';
import {SearchBar} from '@screens/ChatFlow/components/SearchBar';
import {ExploreFilter} from '@screens/ChatFlow/Explore/components/ExploreFilter';
import {ExploreRow} from '@screens/ChatFlow/Explore/components/ExploreRow';
import {ExploreFilterType} from '@screens/ChatFlow/Explore/types';
import {SEARCH_HIDDEN_Y} from '@screens/ChatFlow/Messages/constants';
import {useAnimatedSearch} from '@screens/ChatFlow/Messages/hooks/useAnimatedSearch';
import {ChatActions} from '@store/modules/Chat/actions';
import {
  exploreDataSelector,
  exploreDataTypeSelector,
  getLoadingChatDataSelector,
} from '@store/modules/Chat/selectors';
import {
  ChatDataType,
  ExploreData,
  ExploreDataType,
} from '@store/modules/Chat/types';
import debounce from 'lodash/debounce';
import * as React from 'react';
import {useCallback, useEffect, useRef, useState} from 'react';
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
  const refreshingRef = useRef(false);
  const loading = useSelector(getLoadingChatDataSelector(dataType));
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState('');
  const onChangeText = debounce(setSearchValue, 600);

  const toggleFilter = useCallback(
    (filterType: ExploreFilterType) => {
      dispatch(
        ChatActions.SET_EXPLORE_DATA_TYPE.STATE.create({
          exploreDataType: getExploreDataType(filterType),
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(
      ChatActions.LOAD_CHAT_DATA.START.create({
        initial: true,
        dataType,
        searchValue,
      }),
    );
  }, [dispatch, exploreDataType, searchValue]);

  const renderItem = ({item}: {item: ExploreData}) => {
    return (
      <View key={item.displayName} style={styles.rowContainer}>
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
          onEndReached={() => {
            dispatch(
              ChatActions.LOAD_CHAT_DATA.START.create({dataType, searchValue}),
            );
          }}
          onRefresh={() => {
            dispatch(
              ChatActions.LOAD_CHAT_DATA.START.create({
                initial: true,
                dataType,
                searchValue,
              }),
            );
            refreshingRef.current = true;
          }}
          refreshing={loading && refreshingRef.current}
          ItemSeparatorComponent={ItemSeparator}
          ListFooterComponent={
            loading && !refreshingRef.current ? ActivityIndicator : null
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
  rowContainer: {
    paddingHorizontal: SCREEN_SIDE_OFFSET,
  },
  animatedContainerMargin: {
    marginBottom: SEARCH_HIDDEN_Y,
  },
});
