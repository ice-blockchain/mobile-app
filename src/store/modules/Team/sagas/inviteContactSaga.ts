// SPDX-License-Identifier: BUSL-1.1

import {TeamActions} from '@store/modules/Team/actions';
import {ContactById} from '@store/modules/Team/reducer';
import {getContactsByIdsSelector} from '@store/modules/Team/selectors';
import {t} from '@translations/i18n';
import {openSMS} from '@utils/openSms';
import {put, select} from 'redux-saga/effects';

const actionCreator = TeamActions.INVITE_CONTACT.START.create;

export function* inviteContactSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {id} = action.payload;
    const contactsByIds: ContactById = yield select(getContactsByIdsSelector);
    const contact = contactsByIds[id];
    const text = `${t('team.contacts_list.invitation_text', {
      name: contact.firstName,
    })}}`;
    const [phone] = contact.phoneNumbers;
    openSMS(phone, text);

    yield put(TeamActions.INVITE_CONTACT.SUCCESS.create(id));
  } catch (error) {
    let errorMessage = 'Failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(TeamActions.INVITE_CONTACT.FAILED.create(errorMessage));
  }
}
