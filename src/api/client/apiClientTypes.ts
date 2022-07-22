// SPDX-License-Identifier: BUSL-1.1

export type HttpHeaders = {
  [key: string]: string;
};

export type RequestConfig = {
  headers: HttpHeaders;
  transformRequest?: (data: FormData) => FormData;
};
