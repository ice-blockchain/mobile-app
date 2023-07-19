// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {RankingSummary} from '@api/tokenomics/types';
import {Attributes} from '@services/analytics';
import {userIdSelector, userSelector} from '@store/modules/Account/selectors';
import {AnalyticsActions} from '@store/modules/Analytics/actions';
import {referredByIdSelector} from '@store/modules/Analytics/selectors';
import {isPermissionGrantedSelector} from '@store/modules/Permissions/selectors';
import {
  miningSummarySelector,
  preStakingSummarySelector,
  rankingSummarySelector,
} from '@store/modules/Tokenomics/selectors';
import {getTimezoneOffset} from '@utils/device';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

function* updateUserAttributes() {
  const user: ReturnType<typeof userSelector> = yield select(userSelector);
  const referredById: ReturnType<typeof referredByIdSelector> = yield select(
    referredByIdSelector,
  );
  if (user) {
    yield call(Attributes.trackUserFirstName, user.firstName ?? '');
    yield call(Attributes.trackUserLastName, user.lastName ?? '');
    yield call(Attributes.trackUserAttribute, 'Username', user.username ?? '');
    yield call(Attributes.trackUserEmail, user.email ?? '');
    yield call(Attributes.trackUserContactNumber, user.phoneNumber ?? '');
    yield call(Attributes.trackUserAttribute, 'City', user.city ?? '');
    yield call(Attributes.trackUserAttribute, 'Country', user.country ?? '');
    const t1ReferralCount = user.t1ReferralCount ?? 0;
    const t2ReferralCount = user.t2ReferralCount ?? 0;
    const userReferralsCount = t1ReferralCount + t2ReferralCount;
    yield call(
      Attributes.trackUserAttribute,
      'Referrals Count',
      userReferralsCount,
    );
    yield call(Attributes.trackUserAttribute, 'Tier 1 Count', t1ReferralCount);
    yield call(Attributes.trackUserAttribute, 'Tier 2 Count', t2ReferralCount);
    yield call(
      Attributes.trackUserAttributeISODateString,
      'Registration Date',
      user.createdAt ?? '',
    );
    yield call(
      Attributes.trackUserAttribute,
      'Profile Picture URL',
      user.profilePictureUrl ?? '',
    );
    yield call(Attributes.trackUserAttribute, 'Language', user.language);
    if (referredById !== user.referredBy && user.referredBy) {
      try {
        const {
          data: referredByUser,
        }: SagaReturnType<typeof Api.user.getUserById> = yield call(
          Api.user.getUserById,
          user.referredBy,
        );
        yield put(
          AnalyticsActions.UPDATE_REFERRED_BY.START.create(referredByUser),
        );
      } catch {}
    }
  }
}

function* updateDeviceAttributes() {
  yield call(Attributes.trackUserAttribute, 'OS', Platform.OS);
  const device: SagaReturnType<typeof DeviceInfo.getModel> = yield call(
    DeviceInfo.getModel,
  );
  yield call(Attributes.trackUserAttribute, 'Device', device);
  yield call(Attributes.trackUserAttribute, 'Timezone', getTimezoneOffset());
}

function* updateGlobalRank() {
  const userId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );
  const rankingSummary: RankingSummary | null = yield select(
    rankingSummarySelector(userId),
  );
  const globalRank = rankingSummary?.globalRank ?? 0;
  yield call(Attributes.trackUserAttribute, 'Global Rank', globalRank);
}

function* updateMiningAttributes() {
  const miningSummary: ReturnType<typeof miningSummarySelector> = yield select(
    miningSummarySelector,
  );
  yield call(
    Attributes.trackUserAttribute,
    'Streak',
    miningSummary?.miningStreak ?? 0,
  );
  yield call(
    Attributes.trackUserAttribute,
    'Remaining days off',
    miningSummary?.remainingFreeMiningSessions ?? 0,
  );
}

export function* updateAllowContactsAccess() {
  const allowed: boolean = yield select(
    isPermissionGrantedSelector('contacts'),
  );

  yield call(
    Attributes.trackUserAttribute,
    'Allowed Contacts Access',
    String(allowed),
  );
}

export function* updatePreStakingAttributes() {
  const preStakingSummary: ReturnType<typeof preStakingSummarySelector> =
    yield select(preStakingSummarySelector);
  yield call(
    Attributes.trackUserAttribute,
    'Pre-staking Allocation',
    preStakingSummary?.allocation ?? 0,
  );
  yield call(
    Attributes.trackUserAttribute,
    'Pre-staking Period',
    preStakingSummary?.years ?? 0,
  );
}

export function* updateAttributesSaga() {
  yield call(updateUserAttributes);
  yield call(updateDeviceAttributes);
  yield call(updateGlobalRank);
  yield call(updateMiningAttributes);
  yield call(updateAllowContactsAccess);
  yield call(updatePreStakingAttributes);
}
