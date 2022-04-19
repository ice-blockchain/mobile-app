// SPDX-License-Identifier: BUSL-1.1

/**
 * The user type. Either the logged in user or other ones
 */
export interface User {
  id: string;
  username: string | null;
  email: string | null;
  level: number;
  globalRank: number;
  refferalsCount: number;
}

/**
 * Entire application state
 */
export type StoreState = {};

export type Content = {id: string; branchUrl: string};
