// SPDX-License-Identifier: ice License 1.0

export interface NoticeData {
  link: string;
  data: {
    [locale: string]: {
      title: string;
      content: string;
    };
  };
}
