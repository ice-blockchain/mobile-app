// SPDX-License-Identifier: ice License 1.0

import {ChannelPostData} from '@screens/ChatFlow/Channel/components/ChannelFeed/type';
import {ChannelPostDataByDate} from '@screens/ChatFlow/Channel/types';

export function findPostById({
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

export function updatePostById({
  newPostData,
  dataByDate,
}: {
  newPostData: ChannelPostData;
  dataByDate: ChannelPostDataByDate[];
}) {
  return dataByDate.map(item => {
    const index = item.data.findIndex(post => post.id === newPostData.id);
    if (index < 0) {
      return item;
    }
    return {
      ...item,
      data: [
        ...item.data.slice(0, index),
        newPostData,
        ...item.data.slice(index + 1, item.data.length - 1),
      ],
    };
  });
}

export function deletePostById({
  postId,
  dataByDate,
}: {
  postId: number;
  dataByDate: ChannelPostDataByDate[];
}) {
  return dataByDate.map(item => {
    const index = item.data.findIndex(post => post.id === postId);
    if (index < 0) {
      return item;
    }
    return {
      ...item,
      data: [
        ...item.data.slice(0, index),
        ...item.data.slice(index + 1, item.data.length - 1),
      ],
    };
  });
}
