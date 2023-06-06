// SPDX-License-Identifier: ice License 1.0

import {stopPropagation} from '@components/KeyboardDismiss';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles, SCREEN_SIDE_OFFSET, windowWidth} from '@constants/styles';
import {useTopOffsetStyle} from '@navigation/hooks/useTopOffsetStyle';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ChannelPost} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelPost';
import {ChannelPostData} from '@screens/ChatFlow/Channel/components/ChannelFeed/type';
import {ContextEmojiBar} from '@screens/ChatFlow/Channel/components/ChannelPostHighlight/components/ContextEmojiBar';
import {ContextMenu} from '@screens/ChatFlow/Channel/components/ChannelPostHighlight/components/ContextMenu';
import {RoundedTriangle} from '@svg/RoundedTriangle';
import * as React from 'react';
import {useCallback, useState} from 'react';
import {
  InteractionManager,
  LayoutChangeEvent,
  LayoutRectangle,
  StyleSheet,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Animated, {FadeInDown, LightSpeedInLeft} from 'react-native-reanimated';
import {rem, screenHeight} from 'rn-units';

const TRIANGLE_WIDTH = rem(18);
const TRIANGLE_HEIGHT = rem(16);

export function ChannelPostHighlight() {
  const topOffset = useTopOffsetStyle();
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<MainStackParamList, 'ChannelPostHighlight'>>();
  const {postData, getPostData, updatePostData, deletePostData} = route.params;
  const updateDisplayPostData = useCallback(
    (newPostData: ChannelPostData) => {
      updatePostData(newPostData);
      InteractionManager.runAfterInteractions(navigation.goBack);
    },
    [navigation, updatePostData],
  );
  const [emojiBarLayout, setEmojiBarLayout] = useState<
    LayoutRectangle | undefined
  >();

  const onEmojiBarLayout = useCallback(({nativeEvent}: LayoutChangeEvent) => {
    setEmojiBarLayout(nativeEvent.layout);
  }, []);

  return (
    <Touchable
      style={[styles.container, topOffset.current]}
      onPress={navigation.goBack}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentOffset={{x: 0, y: screenHeight * 10}}>
        <Animated.View {...stopPropagation} pointerEvents={'box-only'}>
          <ChannelPost
            darkMode
            postData={postData}
            getPostData={getPostData}
            updatePostData={updatePostData}
            deletePostData={deletePostData}
            onEmojiBarLayout={onEmojiBarLayout}
          />
        </Animated.View>
        {emojiBarLayout ? (
          <Animated.View
            entering={LightSpeedInLeft.springify().damping(50).stiffness(200)}
            style={[
              styles.contextEmojiBarContainer,
              commonStyles.shadow,
              {
                top:
                  emojiBarLayout.y -
                  emojiBarLayout.height -
                  TRIANGLE_HEIGHT / 2,
              },
            ]}>
            <View style={styles.contextEmojiBarSubContainer}>
              <ContextEmojiBar
                postData={postData}
                updatePostData={updateDisplayPostData}
              />
            </View>
            <RoundedTriangle
              width={TRIANGLE_WIDTH}
              height={TRIANGLE_HEIGHT}
              fill={COLORS.white}
              style={styles.triangleContainer}
            />
          </Animated.View>
        ) : null}
        <Animated.View
          entering={FadeInDown.springify().damping(50).stiffness(200)}
          style={styles.contextMenuContainer}>
          <ContextMenu postData={postData} />
        </Animated.View>
      </ScrollView>
    </Touchable>
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
  contextEmojiBarContainer: {
    position: 'absolute',
  },
  contextEmojiBarSubContainer: {
    borderRadius: rem(16),
    overflow: 'hidden',
  },
  triangleContainer: {
    position: 'absolute',
    transform: [{rotate: '180deg'}],
    bottom: -TRIANGLE_HEIGHT + 2,
    left: (windowWidth - SCREEN_SIDE_OFFSET * 2 - TRIANGLE_WIDTH) / 2,
  },
});
