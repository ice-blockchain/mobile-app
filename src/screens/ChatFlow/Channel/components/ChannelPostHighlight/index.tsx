// SPDX-License-Identifier: ice License 1.0

import {stopPropagation} from '@components/KeyboardDismiss';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useTopOffsetStyle} from '@navigation/hooks/useTopOffsetStyle';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ChannelPost} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelPost';
import {ContextMenu} from '@screens/ChatFlow/Channel/components/ChannelPostHighlight/components/ContextMenu';
import * as React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {rem, screenHeight} from 'rn-units';

export function ChannelPostHighlight() {
  const topOffset = useTopOffsetStyle();
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<MainStackParamList, 'ChannelPostHighlight'>>();
  const {postData, getPostData, updatePostData, deletePostData} = route.params;

  return (
    <Pressable
      style={[styles.container, topOffset.current]}
      onPress={navigation.goBack}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentOffset={{x: 0, y: screenHeight * 10}}>
        <Animated.View
          // sharedTransitionTag={`post${postData.id}`}
          // sharedTransitionStyle={sharedTransitionStyle}
          {...stopPropagation}
          pointerEvents={'box-only'}>
          <ChannelPost
            darkMode
            postData={postData}
            getPostData={getPostData}
            updatePostData={updatePostData}
            deletePostData={deletePostData}
          />
        </Animated.View>
        <View style={styles.contextMenuContainer}>
          <ContextMenu postData={postData} />
        </View>
      </ScrollView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.transparentBackground,
    paddingHorizontal: SCREEN_SIDE_OFFSET,
  },
  contextMenuContainer: {
    paddingTop: rem(20),
    flexDirection: 'row',
    paddingBottom: rem(45),
  },
});
