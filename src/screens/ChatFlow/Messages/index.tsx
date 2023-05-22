// SPDX-License-Identifier: ice License 1.0

import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {ItemSeparator} from '@screens/ChatFlow/components/ItemSeparator';
import {JoinCommunitiesBanner} from '@screens/ChatFlow/components/JoinCommunitiesBanner';
import {SearchBar} from '@screens/ChatFlow/components/SearchBar';
import {useLoadChatData} from '@screens/ChatFlow/hooks/useLoadChatData';
import {MessagesRow} from '@screens/ChatFlow/Messages/components/MessagesRow';
import {NoConversationsScreen} from '@screens/ChatFlow/Messages/components/NoConversationsScreen';
import {SEARCH_HIDDEN_Y} from '@screens/ChatFlow/Messages/constants';
import {useAnimatedSearch} from '@screens/ChatFlow/Messages/hooks/useAnimatedSearch';
import {messagesDataSelector} from '@store/modules/Chat/selectors';
import {ChatDataType, MessageData} from '@store/modules/Chat/types';
import * as React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

function ListHeaderComponent() {
  return <JoinCommunitiesBanner isDark />;
}

const dataType: ChatDataType = 'chats';

export function Messages() {
  const tabBarOffset = useBottomTabBarOffsetStyle();
  const messages = useSelector(messagesDataSelector);
  const {
    onChangeText,
    loading,
    loadMore,
    refreshing,
    refreshData,
    searchValue,
  } = useLoadChatData(dataType);

  const {scrollHandler, animatedStyle, searchVisible} =
    useAnimatedSearch(dataType);

  const renderItem = ({item}: {item: MessageData}) => {
    return <MessagesRow key={item.id} messageData={item} />;
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
            !messages.length && !loading ? commonStyles.fullHeight : null,
          ]}
          data={messages}
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
          ListHeaderComponent={messages.length ? ListHeaderComponent : null}
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
