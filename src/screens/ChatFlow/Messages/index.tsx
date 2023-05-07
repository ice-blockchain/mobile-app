// SPDX-License-Identifier: ice License 1.0

import {SearchInput} from '@components/Inputs/SearchInput';
import {COLORS} from '@constants/colors';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {CHAT_TAB_BAR_PADDING} from '@navigation/components/ChatTabBar';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {ItemSeparator} from '@screens/ChatFlow/components/ItemSeparator';
import {JoinCommunitiesBanner} from '@screens/ChatFlow/components/JoinCommunitiesBanner';
import {MessagesRow} from '@screens/ChatFlow/Messages/components/MessagesRow';
import {NoConversationsScreen} from '@screens/ChatFlow/Messages/components/NoConversationsScreen';
import {
  SEARCH_HIDDEN_Y,
  SEARCH_MARGIN_VERTICAL,
} from '@screens/ChatFlow/Messages/constants';
import {useAnimatedSearch} from '@screens/ChatFlow/Messages/hooks/useAnimatedSearch';
import {ChatActions} from '@store/modules/Chat/actions';
import {
  messagesDataSelector,
  messagesLoadingSelector,
  messagesSearchVisibleSelector,
} from '@store/modules/Chat/selectors';
import {MessageData} from '@store/modules/Chat/types';
import {t} from '@translations/i18n';
import debounce from 'lodash/debounce';
import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Animated, {useSharedValue} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

function ListHeaderComponent() {
  return <JoinCommunitiesBanner isDark />;
}

export function Messages() {
  const tabBarOffset = useBottomTabBarOffsetStyle();
  const messages = useSelector(messagesDataSelector);
  const loading = useSelector(messagesLoadingSelector);
  const searchVisible = useSelector(messagesSearchVisibleSelector);
  const searchVisibleShared = useSharedValue(searchVisible);
  searchVisibleShared.value = searchVisible;
  const refreshingRef = useRef(false);

  const [searchValue, setSearchValue] = useState<string>('');
  const onChangeText = debounce(setSearchValue, 600);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ChatActions.LOAD_MESSAGES_DATA.START.create(true));
  }, [dispatch]);

  const {scrollHandler, animatedStyle} = useAnimatedSearch();

  const renderItem = ({item}: {item: MessageData}) => {
    return <MessagesRow messageData={item} />;
  };

  const displayMessages = searchValue
    ? messages.filter(message =>
        message.sourceName.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : messages;
  return (
    <View style={commonStyles.flexOne}>
      <Animated.View
        style={[
          styles.animatedContainer,
          animatedStyle,
          !searchVisible ? styles.animatedContainerMargin : null,
        ]}>
        <View style={[styles.searchContainer, commonStyles.shadow]}>
          <SearchInput
            onChangeText={onChangeText}
            placeholder={t('button.search')}
            containerStyle={styles.search}
          />
        </View>
        <Animated.FlatList
          style={commonStyles.flexOne}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContent,
            tabBarOffset.current,
            !displayMessages.length && !loading
              ? commonStyles.fullHeight
              : null,
          ]}
          data={displayMessages}
          renderItem={renderItem}
          onEndReached={() => {
            dispatch(ChatActions.LOAD_MESSAGES_DATA.START.create());
          }}
          onRefresh={() => {
            dispatch(ChatActions.LOAD_MESSAGES_DATA.START.create(true));
            refreshingRef.current = true;
          }}
          refreshing={loading && refreshingRef.current}
          ItemSeparatorComponent={ItemSeparator}
          ListFooterComponent={
            loading && !refreshingRef.current ? ActivityIndicator : null
          }
          ListEmptyComponent={
            !loading ? (
              <NoConversationsScreen searchValue={searchValue} />
            ) : null
          }
          ListHeaderComponent={
            displayMessages.length ? ListHeaderComponent : null
          }
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
  searchContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.secondaryFaint,
    backgroundColor: COLORS.white,
  },
  animatedContainer: {
    flex: 1,
  },
  animatedContainerMargin: {
    marginBottom: SEARCH_HIDDEN_Y,
  },
  search: {
    marginVertical: SEARCH_MARGIN_VERTICAL,
    marginHorizontal: CHAT_TAB_BAR_PADDING,
  },
});
