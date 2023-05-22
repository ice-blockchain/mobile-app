// SPDX-License-Identifier: ice License 1.0

import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {ChannelLoadingIndicator} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelLoadingIndicator';
import {ChannelPost} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelPost';
import {ChannelSectionHeader} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelSectionHeader';
import {CHANNEL_POST_SIDE_OFFSET} from '@screens/ChatFlow/Channel/components/ChannelFeed/constansts';
import {ChannelPostData} from '@screens/ChatFlow/Channel/components/ChannelFeed/type';
import {useLoadChannelData} from '@screens/ChatFlow/Channel/hooks/useLoadChannelData';
import {ChannelPostDataByDate} from '@screens/ChatFlow/Channel/types';
import {ExploreData} from '@store/modules/Chat/types';
import * as React from 'react';
import {useCallback, useRef} from 'react';
import {ActivityIndicator, SectionList, StyleSheet, View} from 'react-native';

type Props = {
  channelData: ExploreData;
};

function ChannelFeedItemSeparator() {
  return <View style={styles.separator} />;
}

function findPostById({
  postId,
  dataByDate,
}: {
  postId: number;
  dataByDate: ChannelPostDataByDate[];
}) {
  for (const item of dataByDate) {
    const foundPost = item.data.find(post => post.id === postId);
    if (foundPost) {
      return foundPost;
    }
  }
  return null;
}

export function ChannelFeed({channelData}: Props) {
  const {refreshData, loadMore, loading, channelPostsDataByDate, refreshing} =
    useLoadChannelData(channelData.id);

  const channelPostsDataByDateRef = useRef(channelPostsDataByDate);
  channelPostsDataByDateRef.current = channelPostsDataByDate;

  const getPostData = useCallback((postId: number) => {
    return findPostById({
      postId,
      dataByDate: channelPostsDataByDateRef.current,
    });
  }, []);

  const renderItem = ({item}: {item: ChannelPostData}) => {
    return (
      <ChannelPost key={item.id} postData={item} getPostData={getPostData} />
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
