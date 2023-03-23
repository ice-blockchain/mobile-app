// SPDX-License-Identifier: ice License 1.0

import {get} from '@api/client';
import {Adoption} from '@api/statistics/types';

export function getAdoption() {
  return get<Adoption>('/tokenomics-statistics/adoption');
}
