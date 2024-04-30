// SPDX-License-Identifier: ice License 1.0

import {buildFormData, patch} from '@api/client';

interface Params {
  language: string;
  newsId: string;
}

export function markViewed({language, newsId}: Params) {
  return patch<FormData, unknown>(
    `/news/${language}/${newsId}`,
    buildFormData({
      markViewed: true,
    }),
  );
}
