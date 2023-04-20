// SPDX-License-Identifier: ice License 1.0

import {get} from '@api/client';
import {NoticeData} from '@api/statusNotice/types';
import {LINKS} from '@constants/links';

/**
 * Returns an user tasks
 */

export function getNotice(): Promise<NoticeData> {
  return get<NoticeData>(LINKS.STATUS_NOTICE);
}
