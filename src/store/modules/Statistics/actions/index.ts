// SPDX-License-Identifier: BUSL-1.1

import {Country} from '@store/modules/Statistics/reducer';
import {createAction} from '@store/utils/actions/createAction';

const GET_TOP_COUNTRIES = createAction('GET_TOP_COUNTRIES', {
  START: true,
  SUCCESS: (topCountries: Country[]) => ({topCountries}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

export const StatisticsActions = Object.freeze({
  GET_TOP_COUNTRIES,
});
