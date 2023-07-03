// SPDX-License-Identifier: ice License 1.0

export interface NoticeData {
  link?: string;
  gradientColors?: string[];
  icon?: string;
  newsData?: {
    id: string;
    url: string;
    localisedData: {
      [locale: string]: {
        title: string;
      };
    };
  };
  data?: {
    [locale: string]: {
      title: string;
      content: string;
    };
  };
}
