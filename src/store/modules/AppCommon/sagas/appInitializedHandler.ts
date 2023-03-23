// SPDX-License-Identifier: ice License 1.0

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {
  failedInitializeActionSelector,
  initSuccessSelector,
} from '@store/modules/AppCommon/selectors';
import {failedReasonSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {t} from '@translations/i18n';
import {call, put, SagaReturnType, select, take} from 'redux-saga/effects';

function* isModulesInitComplete() {
  const initSuccess: ReturnType<typeof initSuccessSelector> = yield select(
    initSuccessSelector,
  );

  if (initSuccess) {
    yield put(AppCommonActions.APP_INITIALIZED.SUCCESS.create());

    return true;
  }

  const failedInitializeAction: ReturnType<
    typeof failedInitializeActionSelector
  > = yield select(failedInitializeActionSelector);

  if (failedInitializeAction) {
    const errorMessage: ReturnType<typeof failedReasonSelector> = yield select(
      failedReasonSelector.bind(null, failedInitializeAction),
    );
    yield put(
      AppCommonActions.APP_INITIALIZED.FAILED.create(
        errorMessage ?? t('errors.general_error_message'),
      ),
    );
    return true;
  }

  return false;
}

export function* appInitializedHandlerSaga() {
  while (
    !((yield call(isModulesInitComplete)) as SagaReturnType<
      typeof isModulesInitComplete
    >)
  ) {
    yield take('*');
  }
}
