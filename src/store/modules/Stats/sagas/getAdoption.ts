// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {dayjs} from '@services/dayjs';
import {isAuthorizedSelector} from '@store/modules/Account/selectors';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {StatsActions} from '@store/modules/Stats/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

const NUMBER_OF_MILESTONES_FROM_API = 3;
const MILESTONES_BY_DATE = [
  {
    baseMiningRate: '2',
    achievementDate: '2023-12-01',
  },
  {
    baseMiningRate: '1',
    achievementDate: '2024-03-01',
  },
  {
    baseMiningRate: '0.5',
    achievementDate: '2024-04-01',
  },
  {
    baseMiningRate: '0.25',
    achievementDate: '2024-05-01',
  },
  {
    baseMiningRate: '0.125',
    achievementDate: '2024-06-01',
  },
  {
    baseMiningRate: '0.0625',
    achievementDate: '2024-07-01',
  },
  {
    baseMiningRate: '0.03125',
    achievementDate: '2024-08-01',
  },
  {
    baseMiningRate: '0.015625',
    achievementDate: '2024-09-01',
  },
];

export function* getAdoptionSaga() {
  try {
    const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
      isAuthorizedSelector,
    );
    const isAppActive: ReturnType<typeof isAppActiveSelector> = yield select(
      isAppActiveSelector,
    );

    if (!isAuthorized || !isAppActive) {
      return null;
    }

    const {data: adoption}: SagaReturnType<typeof Api.statistics.getAdoption> =
      yield call(Api.statistics.getAdoption);

    const milestones = [
      ...adoption.milestones.slice(0, NUMBER_OF_MILESTONES_FROM_API),
      ...MILESTONES_BY_DATE.map((milestone, index) => ({
        baseMiningRate: milestone.baseMiningRate,
        milestone: NUMBER_OF_MILESTONES_FROM_API + index + 1,
        achievedAt: dayjs().isAfter(milestone.achievementDate)
          ? milestone.achievementDate
          : undefined,
        achievementDate: milestone.achievementDate,
      })),
    ];

    yield put(
      StatsActions.GET_ADOPTION.SUCCESS.create({
        milestones,
        totalActiveUsers: adoption.totalActiveUsers,
      }),
    );
  } catch (error) {
    yield put(StatsActions.GET_ADOPTION.FAILED.create(getErrorMessage(error)));
    throw error;
  }
}
