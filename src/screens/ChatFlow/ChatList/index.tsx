// SPDX-License-Identifier: ice License 1.0

import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {ChatRow} from '@screens/ChatFlow/ChatList/components/ChatRow';
import {NoConversationsScreen} from '@screens/ChatFlow/ChatList/components/NoConversationsScreen';
import {SEARCH_HIDDEN_Y} from '@screens/ChatFlow/ChatList/constants';
import {useAnimatedSearch} from '@screens/ChatFlow/ChatList/hooks/useAnimatedSearch';
import {ItemSeparator} from '@screens/ChatFlow/components/ItemSeparator';
import {JoinCommunitiesBanner} from '@screens/ChatFlow/components/JoinCommunitiesBanner';
import {SearchBar} from '@screens/ChatFlow/components/SearchBar';
import {useLoadChatData} from '@screens/ChatFlow/hooks/useLoadChatData';
import {chatListDataSelector} from '@store/modules/Chats/selectors';
import {ChatData, ChatDataType} from '@store/modules/Chats/types';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

function ListHeaderComponent() {
  return <JoinCommunitiesBanner isDark />;
}

const dataType: ChatDataType = 'chats';

export function ChatList() {
  const tabBarOffset = useBottomTabBarOffsetStyle();
  const chatListData = useSelector(chatListDataSelector);
  const {
    onChangeText,
    loading,
    loadMore,
    refreshing,
    refreshData,
    searchValue,
  } = useLoadChatData(dataType);

  const {scrollHandler, animatedStyle, searchVisible} = useAnimatedSearch();

  const renderItem = ({item}: {item: ChatData}) => {
    return <ChatRow key={item.id} messageData={item} />;
  };

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
          contentContainerStyle={[
            styles.listContent,
            tabBarOffset.current,
            !chatListData.length && !loading ? commonStyles.fullHeight : null,
          ]}
          data={chatListData}
          renderItem={renderItem}
          onEndReached={loadMore}
          onRefresh={refreshData}
          refreshing={refreshing}
          ItemSeparatorComponent={ItemSeparator}
          ListFooterComponent={
            loading && !refreshing ? ActivityIndicator : null
          }
          ListEmptyComponent={
            !loading ? (
              <NoConversationsScreen searchValue={searchValue} />
            ) : null
          }
          ListHeaderComponent={chatListData.length ? ListHeaderComponent : null}
          initialNumToRender={20}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    paddingTop: rem(16),
  },
  animatedContainerMargin: {
    marginBottom: SEARCH_HIDDEN_Y,
  },
});
