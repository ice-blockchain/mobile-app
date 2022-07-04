// SPDX-License-Identifier: BUSL-1.1

import {all, call, spawn} from 'redux-saga/effects';

import {rootAuthSaga} from './modules/Auth/sagas';
import {rootNewsSaga} from './modules/News/sagas';
import {rootReferralsSaga} from './modules/Referrals/sagas';
import {rootStatisticsSaga} from './modules/Statistics/sagas';
import {rootValidationSaga} from './modules/Validation/sagas';

export function* rootSaga() {
  const sagas = [
    rootNewsSaga,
    rootValidationSaga,
    rootReferralsSaga,
    rootStatisticsSaga,
    rootAuthSaga,
  ];
  yield all([
    ...sagas.map((saga, index) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (error) {
            console.log('One of rootSaga will be restarted. Error:', error);

            const logError = new Error();
            logError.message = `Crash of Saga #${index} // name: ${
              saga.name
            } // Error: ${(error as Error).message}`;
            logError.stack = (error as Error).stack;

            console.log(`Log this error to Crashlytics ${logError}`);
          }
        }
      }),
    ),
  ]);
}
