// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {
  isAuthorizedSelector,
  userSelector,
} from '@store/modules/Account/selectors';
import {BackgroundTasksActions} from '@store/modules/BackgroundTasks/actions';
import {ContactsActions} from '@store/modules/Contacts/actions';
import {numberOfSyncedContactsSelector} from '@store/modules/Contacts/selectors';
import {isPermissionGrantedSelector} from '@store/modules/Permissions/selectors';
import {getErrorMessage} from '@utils/errors';
import {e164PhoneNumber, hashPhoneNumber} from '@utils/phoneNumber';
import {getChunks, runInChunks} from '@utils/promise';
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

    const numberOfSyncedContacts: ReturnType<
      typeof numberOfSyncedContactsSelector
    > = yield select(numberOfSyncedContactsSelector);

    if (numberOfSyncedContacts === contacts.length) {
      return;
    }

    const user: User = yield select(userSelector);

    const userPhoneNumberHashes = new Set(
      user.agendaPhoneNumberHashes?.split(AGENDA_PHONE_NUMBER_DIVIDER),
    );

    const agendaPhoneNumberHashes: Set<string> = new Set();

    // Run e164PhoneNumber and hashPhoneNumber in chunks to avoid ANR
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
      agendaPhoneNumber => userPhoneNumberHashes.has(agendaPhoneNumber),
    );

    const updateChunks = getChunks(newAgendaPhoneNumberHashes, 500);

    while (updateChunks.length) {
      const updateChunk = updateChunks.pop() ?? [];

      yield put(
        AccountActions.UPDATE_ACCOUNT.START.create({
          agendaPhoneNumberHashes: [...updateChunk].join(
            AGENDA_PHONE_NUMBER_DIVIDER,
          ),
        }),
      );

      const {error} = yield race({
        success: take(AccountActions.UPDATE_ACCOUNT.SUCCESS.type),
        error: take([
          AccountActions.UPDATE_ACCOUNT.FAILED.type,
          AccountActions.UPDATE_ACCOUNT.RESET.type,
        ]),
      });

      if (error) {
        throw new Error('Error setting agendaPhoneNumberHashes');
      }
    }

    yield put(
      ContactsActions.SYNC_CONTACTS.SUCCESS.create({
        numberOfSyncedContacts: contacts.length,
      }),
    );
  } catch (error) {
    yield put(
      ContactsActions.SYNC_CONTACTS.FAILED.create(getErrorMessage(error)),
    );
    throw error;
  } finally {
    if (
      action.type ===
      BackgroundTasksActions.SYNC_CONTACTS_BACKGROUND_TASK.STATE.type
    ) {
      action.payload.finishTask();
    }
  }
}
