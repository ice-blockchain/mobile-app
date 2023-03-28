// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {
  getCurrentRoute,
  goBack,
  navigate,
  removeScreenByName,
} from '@navigation/utils';
import {AccountActions} from '@store/modules/Account/actions';
import {userSelector} from '@store/modules/Account/selectors';
import {WalkthroughActions} from '@store/modules/Walkthrough/actions';
import {walkthroughStepCandidatesSelector} from '@store/modules/Walkthrough/selectors';
import {
  WalkthroughStep,
  WalkthroughStepKey,
} from '@store/modules/Walkthrough/types';
import {waitForSelector} from '@store/utils/sagas/effects';
import {
  call,
  delay,
  put,
  SagaReturnType,
  select,
  take,
} from 'redux-saga/effects';

export function* showWalkthroughSaga() {
  while (true) {
    yield call(
      waitForSelector,
      state => walkthroughStepCandidatesSelector(state).length > 0,
      {
        takePattern: [
          WalkthroughActions.SET_WALKTHROUGH_STEP_ELEMENT_DATA.STATE.type,
          WalkthroughActions.RESTART_WALKTHROUGH.STATE.type,
        ],
      },
    );

    /**
     * Waiting 1 second so all the candidates on the screen are set.
     * E.g. elements within the BottomSheet are rerendered several times
     * before the final position is set
     */
    yield delay(1000);

    const steps: ReturnType<typeof walkthroughStepCandidatesSelector> =
      yield select(walkthroughStepCandidatesSelector);

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const isLast = i === steps.length - 1;

      if (step.before) {
        yield call(step.before);
      }

      yield navigate({
        name: 'Walkthrough',
        params: {step, index: i, total: steps.length},
      });

      const user: User = yield select(userSelector);
      yield call(markWalkthroughStep, user, step);

      const action: ReturnType<
        | typeof WalkthroughActions.COMPLETE_WALKTHROUGH_STEP.STATE.create
        | typeof WalkthroughActions.SKIP_WALKTHROUGH.STATE.create
        | typeof WalkthroughActions.RESTART_WALKTHROUGH.STATE.create
      > = yield take([
        WalkthroughActions.COMPLETE_WALKTHROUGH_STEP.STATE.type,
        WalkthroughActions.SKIP_WALKTHROUGH.STATE.type,
        WalkthroughActions.RESTART_WALKTHROUGH.STATE.type,
      ]);

      if (step.after) {
        yield call(step.after);
      }

      if (
        action.type === WalkthroughActions.SKIP_WALKTHROUGH.STATE.type ||
        action.type === WalkthroughActions.RESTART_WALKTHROUGH.STATE.type ||
        isLast
      ) {
        yield call(closeWalkthrough);

        if (action.type === WalkthroughActions.SKIP_WALKTHROUGH.STATE.type) {
          yield call(markAllWalkthroughSteps, user, steps);
        }

        break;
      }
    }
  }
}

function* closeWalkthrough() {
  const currentRoute: SagaReturnType<typeof getCurrentRoute> = yield call(
    getCurrentRoute,
  );
  /**
   * Walkthrough might be already closed e.g. as a result of step.after
   */
  if (currentRoute?.name === 'Walkthrough') {
    yield goBack();
  } else {
    yield removeScreenByName('Walkthrough');
  }
}

function* markWalkthroughStep(user: User, step: WalkthroughStep) {
  yield put(
    WalkthroughActions.SET_WALKTHROUGH_STEP_SEEN.STATE.create({
      stepKey: step.key,
    }),
  );
  yield put(
    AccountActions.UPDATE_ACCOUNT.START.create(
      {
        clientData: {
          ...(user.clientData ?? {}),
          walkthroughProgress: {
            ...(user.clientData?.walkthroughProgress ?? {}),
            [step.key]: {version: step.version},
          },
        },
      },
      function* (freshUser) {
        if (
          freshUser.clientData?.walkthroughProgress?.[step.key]?.version !==
          step.version
        ) {
          markWalkthroughStep(freshUser, step);
        }
        return {retry: false};
      },
    ),
  );
}

function* markAllWalkthroughSteps(user: User, steps: WalkthroughStep[]) {
  yield put(
    WalkthroughActions.SKIP_WALKTHROUGH.STATE.create({
      stepsKeys: steps.map((step: WalkthroughStep) => step.key),
    }),
  );

  const walkthroughProgress = steps.reduce<{
    [key in WalkthroughStepKey]?: {version: number};
  }>((result, step) => {
    result[step.key] = {version: step.version};
    return result;
  }, {});

  yield put(
    AccountActions.UPDATE_ACCOUNT.START.create(
      {
        clientData: {
          ...(user.clientData ?? {}),
          walkthroughProgress: {
            ...(user.clientData?.walkthroughProgress ?? {}),
            ...walkthroughProgress,
          },
        },
      },
      function* (freshUser) {
        markAllWalkthroughSteps(freshUser, steps);
        return {retry: true};
      },
    ),
  );
}
