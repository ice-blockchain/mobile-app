// SPDX-License-Identifier: BUSL-1.1

export type ApiError = {
  code: string;
  error: string;
  data?: {[key: string]: unknown};
};
