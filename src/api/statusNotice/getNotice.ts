// SPDX-License-Identifier: ice License 1.0

import {get} from '@api/client';
import {NO_CACHE_HEADERS} from '@api/client/getHeaders';
import {NoticeData} from '@api/statusNotice/types';
import {ENV} from '@constants/env';

export function getNotice() {
  return get<NoticeData>(ENV.STATUS_NOTICE_JSON ?? '', undefined, undefined, {
    headers: NO_CACHE_HEADERS,
  });
}
