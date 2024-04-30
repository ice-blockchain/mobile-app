// SPDX-License-Identifier: ice License 1.0

export interface NoticeData {
  link?: string;
  gradientColors?: string[];
  icon?: string;
  newsData?: {
    id: string;
    localisedData: {
      [locale: string]: {
        title: string;
        url: string;
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
