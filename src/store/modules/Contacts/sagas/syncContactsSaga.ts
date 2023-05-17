// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {
  isAuthorizedSelector,
  userSelector,
} from '@store/modules/Account/selectors';
import {ContactsActions} from '@store/modules/Contacts/actions';
import {isPermissionGrantedSelector} from '@store/modules/Permissions/selectors';
import {getErrorMessage} from '@utils/errors';
import {e164PhoneNumber, hashPhoneNumber} from '@utils/phoneNumber';
import {runInChunks} from '@utils/promise';
import {getAllWithoutPhotos} from 'react-native-contacts';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* syncContactsSaga() {
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

    const user: User = yield select(userSelector);

    const contacts: SagaReturnType<typeof getAllWithoutPhotos> = yield call(
      getAllWithoutPhotos,
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

    //TODO:: send agendaPhoneNumberHashes
    //  AccountActions.UPDATE_ACCOUNT.START.create(
    //     {
    //       agendaPhoneNumberHashes: [...phoneNumberHashes].join(','),
    //     },
    //     function* (freshUser) {
    //       if (
    //         freshUser.agendaPhoneNumberHashes?.length !==
    //         user.agendaPhoneNumberHashes?.length
    //       ) {
    //         yield call(
    //           updateAgendaPhoneNumberHashes,
    //           agendaPhoneNumberHashes,
    //           freshUser,
    //         );
    //         return {retry: false};
    //       }
    //       return {retry: true};
    //     },
    //   ),
    // );

    yield put(ContactsActions.SYNC_CONTACTS.SUCCESS.create());
  } catch (error) {
    yield put(
      ContactsActions.SYNC_CONTACTS.FAILED.create(getErrorMessage(error)),
    );
    throw error;
  }
}
