// SPDX-License-Identifier: BUSL-1.1

import {TeamActions} from '@store/modules/Team/actions';
import {t} from '@translations/i18n';
import {getContactName} from '@utils/contacts';
import {openSMS} from '@utils/openSms';
import {Contact, getContactById} from 'react-native-contacts';
import {call, put} from 'redux-saga/effects';

const actionCreator = TeamActions.INVITE_CONTACT.START.create;

export function* inviteContactSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {id} = action.payload;
    const contact: Contact | null = yield call(getContactById, id);
    if (!contact) {
      throw new Error('Contact not found');
    }
    if (!contact.phoneNumbers.length) {
      throw new Error('Contact has no phone numbers');
    }
    const text = `${t('team.contacts_list.invitation_text', {
      name: getContactName(contact),
    })}}`;
    const [{number}] = contact.phoneNumbers;
    openSMS(number, text);

    yield put(TeamActions.INVITE_CONTACT.SUCCESS.create(id));
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(TeamActions.INVITE_CONTACT.FAILED.create(errorMessage));
  }
}
