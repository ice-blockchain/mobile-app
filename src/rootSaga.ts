// SPDX-License-Identifier: BUSL-1.1

import {all, call, spawn} from 'redux-saga/effects';
import NewsSaga from './modules/News/sagas';

export default function* rootSaga() {
  const sagas = [NewsSaga];
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
            logError.message = `Crash of Saga #${index} // name: ${saga.name} // Error: ${error.message}`;
            logError.stack = error.stack;

            console.log(`Log this error to Crashlytics ${logError}`);
          }
        }
      }),
    ),
  ]);
}
