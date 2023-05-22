// SPDX-License-Identifier: ice License 1.0

export type ChannelPostData = {
  id: number;
  sourceName: string;
  views: number;
  postTimestamp: number;
  edited?: boolean;
  totalComments: number;
  lastCommentatorsLogos: string[];
  emojis: {
    [emoji: string]: {
      counter: number;
      liked?: boolean;
    };
  };

  postEmoji?: string;
  replyToPost?: number;
  postText?: string;
  postCaption?: string;
  postImages?: string[];
  postLink?: {
    link: string;
    source: string;
    sourceLogo: string;
    title: string;
    shortDescription: string;
  };
  postFile?: {
    fileName: string;
    fileSize: number;
  };
};
