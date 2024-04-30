// SPDX-License-Identifier: ice License 1.0

import {shareSMS} from '@services/share';
import {usernameSelector} from '@store/modules/Account/selectors';
import {ContactsActions} from '@store/modules/Contacts/actions';
import {t} from '@translations/i18n';
import {getContactName} from '@utils/contacts';
import {getErrorMessage, showError} from '@utils/errors';
import {buildUsernameLink} from '@utils/username';
import {Contact, getContactById} from 'react-native-contacts';
import {call, put, SagaReturnType, select, spawn} from 'redux-saga/effects';

export function* inviteContactSaga(
  action: ReturnType<typeof ContactsActions.INVITE_CONTACT.START.create>,
) {
  const username: SagaReturnType<typeof usernameSelector> = yield select(
    usernameSelector,
  );
  try {
    const {id} = action.payload;
    const contact: Contact | null = yield call(getContactById, id);
    if (!contact) {
      throw new Error('Contact not found');
    }
    if (!contact.phoneNumbers.length) {
      throw new Error('Contact has no phone numbers');
    }

    const url = buildUsernameLink(username);

    const text = `${t('team.contacts_list.invitation_text', {
      name: getContactName(contact),
    })} ${url}`;
    const [{number}] = contact.phoneNumbers;
    shareSMS(number, text);

    yield put(ContactsActions.INVITE_CONTACT.SUCCESS.create(id));
  } catch (error) {
    yield put(
      ContactsActions.INVITE_CONTACT.FAILED.create(getErrorMessage(error)),
    );
    yield spawn(showError, error);
    throw error;
  }
}
