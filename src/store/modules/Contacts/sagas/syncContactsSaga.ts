// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {
  isAuthorizedSelector,
  userSelector,
} from '@store/modules/Account/selectors';
import {BackgroundTasksActions} from '@store/modules/BackgroundTasks/actions';
import {isPermissionGrantedSelector} from '@store/modules/Permissions/selectors';
import {e164PhoneNumber, hashPhoneNumber} from '@utils/phoneNumber';
import {runInChunks} from '@utils/promise';
import {getAllWithoutPhotos} from 'react-native-contacts';
import {
  call,
  put,
  race,
  SagaReturnType,
  select,
  take,
} from 'redux-saga/effects';

const AGENDA_PHONE_NUMBER_DIVIDER = ',';

export function* syncContactsSaga(
  action: ReturnType<
    typeof BackgroundTasksActions.SYNC_CONTACTS_BACKGROUND_TASK.STATE.create
  >,
) {
  try {
    const hasPermissions: ReturnType<
      ReturnType<typeof isPermissionGrantedSelector>
    > = yield select(isPermissionGrantedSelector('contacts'));
    const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
      isAuthorizedSelector,
    );

    if (!isAuthorized || !hasPermissions) {
      return;
    }

    const contacts: SagaReturnType<typeof getAllWithoutPhotos> = yield call(
      getAllWithoutPhotos,
    );

    //TODO:: save numberOfSyncedContacts after sync and if equal to contacts.length, don't continue

    const user: User = yield select(userSelector);

    const userPhoneNumberHashes = new Set(
      user.agendaPhoneNumberHashes?.split(AGENDA_PHONE_NUMBER_DIVIDER),
    );

    const agendaPhoneNumberHashes: Set<string> = new Set();

    yield runInChunks(
      contacts,
      async contact =>
        Promise.all(
          contact.phoneNumbers.map(async record => {
            if (record.number?.trim()) {
              const e164FormattedForHash = e164PhoneNumber(
                record.number,
                user.country,
              );
              if (e164FormattedForHash) {
                const hash = await hashPhoneNumber(e164FormattedForHash);
                agendaPhoneNumberHashes.add(hash);
              }
            }
          }),
        ),
      200,
    );

    const newAgendaPhoneNumberHashes = [...agendaPhoneNumberHashes].filter(
      agendaPhoneNumber => {
        return userPhoneNumberHashes.has(agendaPhoneNumber);
      },
    );

    yield put(
      AccountActions.UPDATE_ACCOUNT.START.create({
        agendaPhoneNumberHashes: [...newAgendaPhoneNumberHashes].join(
          AGENDA_PHONE_NUMBER_DIVIDER,
        ),
      }),
    );

    yield race([
      take(AccountActions.UPDATE_ACCOUNT.SUCCESS.type),
      take(AccountActions.UPDATE_ACCOUNT.FAILED.type),
      take(AccountActions.UPDATE_ACCOUNT.RESET.type),
    ]);
  } finally {
    if (
      action.type ===
      BackgroundTasksActions.SYNC_CONTACTS_BACKGROUND_TASK.STATE.type
    ) {
      action.payload.finishTask();
    }
  }
}
