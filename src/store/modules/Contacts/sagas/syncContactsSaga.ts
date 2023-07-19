// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {
  isAuthorizedSelector,
  userSelector,
} from '@store/modules/Account/selectors';
import {isAppInitializedSelector} from '@store/modules/AppCommon/selectors';
import {BackgroundTasksActions} from '@store/modules/BackgroundTasks/actions';
import {ContactsActions} from '@store/modules/Contacts/actions';
import {syncedContactsNumbersSelector} from '@store/modules/Contacts/selectors';
import {
  isPermissionFetchedSelector,
  isPermissionGrantedSelector,
} from '@store/modules/Permissions/selectors';
import {waitForSelector} from '@store/utils/sagas/effects';
import {getErrorMessage} from '@utils/errors';
import {checkProp} from '@utils/guards';
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

export const CONTACTS_PHONE_NUMBERS_DIVIDER = ',';

enum SyncError {
  UpdateAccount = 'UpdateAccount',
}

export function* syncContactsSaga(
  action: ReturnType<
    typeof BackgroundTasksActions.SYNC_CONTACTS_BACKGROUND_TASK.STATE.create
  >,
) {
  try {
    yield call(waitForSelector, isAppInitializedSelector);
    yield call(waitForSelector, isPermissionFetchedSelector('contacts'));

    const isAuthorized: SagaReturnType<typeof isAuthorizedSelector> =
      yield select(isAuthorizedSelector);
    const hasPermissions: SagaReturnType<
      ReturnType<typeof isPermissionGrantedSelector>
    > = yield select(isPermissionGrantedSelector('contacts'));

    if (!isAuthorized || !hasPermissions) {
      return;
    }

    const user: User = yield select(userSelector);

    const notSyncedPhoneNumbers: SagaReturnType<
      typeof getNotSyncedPhoneNumbers
    > = yield call(getNotSyncedPhoneNumbers);

    if (!notSyncedPhoneNumbers.length) {
      return;
    }

    const notSyncedPhoneNumberHashes: string[] = [];

    // Run e164PhoneNumber and hashPhoneNumber in chunks to avoid ANR
    yield runInChunks(
      notSyncedPhoneNumbers,
      async phoneNumber => {
        const e164FormattedForHash = e164PhoneNumber(phoneNumber, user.country);
        if (e164FormattedForHash) {
          const hash = await hashPhoneNumber(e164FormattedForHash);
          notSyncedPhoneNumberHashes.push(hash);
        }
      },
      200,
    );

    const updateChunks = getChunks(notSyncedPhoneNumberHashes, 500);

    while (updateChunks.length) {
      const updateChunk = updateChunks.pop() ?? [];
      yield put(
        AccountActions.UPDATE_ACCOUNT.START.create({
          agendaPhoneNumberHashes: [...updateChunk].join(
            CONTACTS_PHONE_NUMBERS_DIVIDER,
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
        throw {code: SyncError.UpdateAccount};
      }
    }

    yield put(
      ContactsActions.SYNC_CONTACTS.SUCCESS.create({
        syncedContactsPhoneNumbers: notSyncedPhoneNumbers.join(
          CONTACTS_PHONE_NUMBERS_DIVIDER,
        ),
      }),
    );
  } catch (error) {
    yield put(
      ContactsActions.SYNC_CONTACTS.FAILED.create(getErrorMessage(error)),
    );
    /**
     * Ignore UpdateAccount errors because these are network issues that often happen in background
     */
    if (!(checkProp(error, 'code') && error.code === SyncError.UpdateAccount)) {
      throw error;
    }
  } finally {
    if (
      action.type ===
      BackgroundTasksActions.SYNC_CONTACTS_BACKGROUND_TASK.STATE.type
    ) {
      action.payload.finishTask();
    }
  }
}

function* getNotSyncedPhoneNumbers() {
  const contacts: SagaReturnType<typeof getAllWithoutPhotos> = yield call(
    getAllWithoutPhotos,
  );

  const contactsPhoneNumbers = contacts.reduce<Set<string>>(
    (phoneNumbers, contact) => {
      contact.phoneNumbers.forEach(record => {
        if (record.number) {
          phoneNumbers.add(record.number);
        }
      });
      return phoneNumbers;
    },
    new Set(),
  );

  const syncedPhoneNumbersRaw: ReturnType<
    typeof syncedContactsNumbersSelector
  > = yield select(syncedContactsNumbersSelector);

  const syncedPhoneNumbers = new Set(
    syncedPhoneNumbersRaw?.length
      ? syncedPhoneNumbersRaw.split(CONTACTS_PHONE_NUMBERS_DIVIDER)
      : null,
  );

  return [...contactsPhoneNumbers].filter(
    contactsPhoneNumber => !syncedPhoneNumbers.has(contactsPhoneNumber),
  );
}
