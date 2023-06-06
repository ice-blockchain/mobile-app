// SPDX-License-Identifier: ice License 1.0

import {fetchChannelPosts} from '@screens/ChatFlow/Channel/components/ChannelFeed/mockData';
import {ChannelPostData} from '@screens/ChatFlow/Channel/components/ChannelFeed/type';
import {ChannelPostDataByDate} from '@screens/ChatFlow/Channel/types';
import {stripTimeFromTimestamp} from '@utils/date';
import {useCallback, useEffect, useRef, useState} from 'react';

const FETCH_LIMIT = 20;

function groupChannelPostsDataByDate(
  channelPosts: ChannelPostData[],
  channelPostsDataByDate: ChannelPostDataByDate[],
): ChannelPostDataByDate[] {
  return channelPosts
    .map(post => {
      return {
        post,
        date: stripTimeFromTimestamp(post.postTimestamp),
      };
    })
    .reduce((groupedPosts, postData) => {
      if (!groupedPosts.length) {
        return [{title: postData.date, data: [postData.post]}];
      }
      const lastGroup = groupedPosts[groupedPosts.length - 1];
      if (lastGroup.title === postData.date) {
        return [
          ...groupedPosts.slice(0, groupedPosts.length - 1),
          {
            title: lastGroup.title,
            data: [...lastGroup.data, postData.post],
          },
        ];
      }
      const newGroup = {
        title: postData.date,
        data: [postData.post],
      };
      return [...groupedPosts, newGroup];
    }, channelPostsDataByDate);
}

export function useLoadChannelData(channelId: number) {
  const [channelPostsDataByDate, setChannelPostsDataByDate] = useState<
    ChannelPostDataByDate[]
  >([]);
  const offsetRef = useRef(0);
  const hasMoreRef = useRef(true);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(loading);
  loadingRef.current = loading;
  const refreshingRef = useRef(false);

  const loadData = useCallback(
    async (initial?: boolean) => {
      if (loadingRef.current || (!hasMoreRef.current && !initial)) {
        return;
      }
      if (initial) {
        refreshingRef.current = true;
        offsetRef.current = 0;
      }
      setLoading(true);
      const newPosts = await fetchChannelPosts({
        channelId,
        offset: offsetRef.current,
        limit: FETCH_LIMIT,
      });
      setChannelPostsDataByDate(current =>
        groupChannelPostsDataByDate(newPosts, current),
      );
      if (newPosts.length < FETCH_LIMIT) {
        hasMoreRef.current = false;
      }
      offsetRef.current += newPosts.length;
      refreshingRef.current = false;
      setLoading(false);
    },
    [channelId],
  );

  useEffect(() => {
    loadData(true);
  }, [loadData]);

  return {
    refreshData: () => loadData(true),
    loadMore: () => loadData(),
    loading,
    channelPostsDataByDate,
    refreshing: loading && refreshingRef.current,
    setChannelPostsDataByDate,
  };
}
