// SPDX-License-Identifier: ice License 1.0

export type ApiError = {
  code: string;
  error: string;
  data?: {[key: string]: unknown};
};
