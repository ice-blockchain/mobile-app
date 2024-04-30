// SPDX-License-Identifier: ice License 1.0

export interface StatusNoticeData {
  data?: {
    title: string;
    content: string;
  };
  newsData?: {
    id: string;
    url: string;
    title: string;
  };
  link?: string;
  icon?: string;
  gradientColors?: string[];
}
