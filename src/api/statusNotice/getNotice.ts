// SPDX-License-Identifier: ice License 1.0

import {get} from '@api/client';
import {NoticeData} from '@api/statusNotice/types';
import {ENV} from '@constants/env';

/**
 * Returns an user tasks
 */

export function getNotice(): Promise<NoticeData> {
  return get<NoticeData>(ENV.STATUS_NOTICE_JSON ?? '');
}
