// SPDX-License-Identifier: ice License 1.0

import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {ChannelLoadingIndicator} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelLoadingIndicator';
import {ChannelPost} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelPost';
import {ChannelSectionHeader} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelSectionHeader';
import {CHANNEL_POST_SIDE_OFFSET} from '@screens/ChatFlow/Channel/components/ChannelFeed/constansts';
import {ChannelPostData} from '@screens/ChatFlow/Channel/components/ChannelFeed/type';
import {
  deletePostById,
  findPostById,
  updatePostById,
} from '@screens/ChatFlow/Channel/components/ChannelFeed/utils';
import {useLoadChannelData} from '@screens/ChatFlow/Channel/hooks/useLoadChannelData';
import {ExploreData} from '@store/modules/Chat/types';
import * as React from 'react';
import {useCallback, useRef} from 'react';
import {ActivityIndicator, SectionList, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';

type Props = {
  channelData: ExploreData;
};

function ChannelFeedItemSeparator() {
  return <View style={styles.separator} />;
}

export function ChannelFeed({channelData}: Props) {
  const {
    refreshData,
    loadMore,
    loading,
    channelPostsDataByDate,
    refreshing,
    setChannelPostsDataByDate,
  } = useLoadChannelData(channelData.id);

  const channelPostsDataByDateRef = useRef(channelPostsDataByDate);
  channelPostsDataByDateRef.current = channelPostsDataByDate;

  const getPostData = useCallback((postId: number) => {
    return findPostById({
      postId,
      dataByDate: channelPostsDataByDateRef.current,
    });
  }, []);

  const updatePostData = useCallback(
    (newPostData: ChannelPostData) => {
      // TODO: update on the BE
      setChannelPostsDataByDate(currentChannelPostsDataByDate =>
        updatePostById({
          newPostData,
          dataByDate: currentChannelPostsDataByDate,
        }),
      );
    },
    [setChannelPostsDataByDate],
  );

  const deletePostData = useCallback(
    (postId: number) => {
      // TODO: delete on the BE
      setChannelPostsDataByDate(currentChannelPostsDataByDate =>
        deletePostById({
          postId,
          dataByDate: currentChannelPostsDataByDate,
        }),
      );
    },
    [setChannelPostsDataByDate],
  );

  const renderItem = ({item}: {item: ChannelPostData}) => {
    return (
      <Animated.View
        key={item.id}
        // sharedTransitionTag={`post${item.id}`}
        // sharedTransitionStyle={sharedTransitionStyle}
      >
        <ChannelPost
          postData={item}
          getPostData={getPostData}
          updatePostData={updatePostData}
          deletePostData={deletePostData}
        />
      </Animated.View>
    );
  };

  const renderSectionHeader = ({
    section: {title},
  }: {
    section: {title: number};
  }) => {
    return <ChannelSectionHeader timestamp={title} />;
  };

  return (
    <SectionList
      showsVerticalScrollIndicator={false}
      sections={channelPostsDataByDate}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      onEndReached={loadMore}
      refreshing={refreshing}
      onRefresh={refreshData}
      ItemSeparatorComponent={ChannelFeedItemSeparator}
      ListEmptyComponent={
        loading && !channelPostsDataByDate.length
          ? ChannelLoadingIndicator
          : null
      }
      ListFooterComponent={loading && !refreshing ? ActivityIndicator : null}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: SCREEN_SIDE_OFFSET,
    paddingHorizontal: SCREEN_SIDE_OFFSET,
  },
  separator: {
    height: CHANNEL_POST_SIDE_OFFSET,
  },
});
