// SPDX-License-Identifier: ice License 1.0

import {ListItemSkeleton} from '@components/ListItems/ListItemSkeleton';
import {SKELETONS_PER_SCREEN} from '@components/ListItems/UserListItem';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import BottomSheet, {
  BottomSheetBackdropProps,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useNavigation} from '@react-navigation/native';
import {ItemSeparator} from '@screens/ChatFlow/components/ItemSeparator';
import {JoinCommunitiesBanner} from '@screens/ChatFlow/components/JoinCommunitiesBanner';
import {useLoadChatData} from '@screens/ChatFlow/hooks/useLoadChatData';
import {ChatSelectorHeader} from '@screens/ChatFlow/NewChatSelector/components/ChatSelectorHeader';
import {ChatSelectorRow} from '@screens/ChatFlow/NewChatSelector/components/ChatSelectorRow';
import {chatUsersDataSelector} from '@store/modules/Chat/selectors';
import {ChatDataType, ChatUserData} from '@store/modules/Chat/types';
import * as React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

function BackdropComponent({animatedIndex}: BottomSheetBackdropProps) {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, -1],
      [1, 0],
      Extrapolate.CLAMP,
    ),
  }));
  return <Animated.View style={[styles.background, containerAnimatedStyle]} />;
}

const SNAP_POINTS = ['95%'];

const dataType: ChatDataType = 'users';

export function NewChatSelector() {
  const navigation = useNavigation();
  const tabBarOffset = useBottomTabBarOffsetStyle();
  const chatUsers = useSelector(chatUsersDataSelector);

  const {onChangeText, loading, loadMore} = useLoadChatData(dataType);

  const renderItem = ({item}: {item: ChatUserData}) => {
    return <ChatSelectorRow key={item.id} chatUser={item} />;
  };

  return (
    <BottomSheet
      snapPoints={SNAP_POINTS}
      enablePanDownToClose
      handleComponent={null}
      onChange={(index: number) => {
        if (index === -1) {
          navigation.goBack();
        }
      }}
      backdropComponent={BackdropComponent}
      style={styles.container}>
      <ChatSelectorHeader onChangeText={onChangeText} />
      <BottomSheetFlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          commonStyles.screenPadding,
          tabBarOffset.current,
        ]}
        data={chatUsers}
        renderItem={renderItem}
        onEndReached={loadMore}
        ListHeaderComponent={JoinCommunitiesBanner}
        ListFooterComponent={
          loading && chatUsers.length ? ActivityIndicator : null
        }
        ListEmptyComponent={
          loading && !chatUsers.length ? (
            <View>
              {Array(SKELETONS_PER_SCREEN)
                .fill(null)
                .map((_, index) => (
                  <ListItemSkeleton key={index} />
                ))}
            </View>
          ) : null
        }
        ItemSeparatorComponent={ItemSeparator}
        initialNumToRender={20}
      />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.transparentBackground,
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    overflow: 'hidden',
    borderTopRightRadius: rem(30),
    borderTopLeftRadius: rem(30),
  },
});
