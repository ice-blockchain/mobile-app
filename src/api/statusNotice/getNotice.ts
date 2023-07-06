// SPDX-License-Identifier: ice License 1.0

import {get} from '@api/client';
import {NoticeData} from '@api/statusNotice/types';
import {ENV} from '@constants/env';

export function getNotice() {
  return get<NoticeData>(ENV.STATUS_NOTICE_JSON ?? '');
}
