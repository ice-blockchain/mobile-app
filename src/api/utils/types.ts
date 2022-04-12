// SPDX-License-Identifier: BUSL-1.1

export interface ApiProfile {
  id: string;
  username: string | null;
  email: string | null;
  level: number;
  globalRank: number;
  refferalsCount: number;
}
