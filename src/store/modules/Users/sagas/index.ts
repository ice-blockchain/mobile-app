// SPDX-License-Identifier: ice License 1.0

import {UsersActions} from '@store/modules/Users/actions';
import {getUserByIdSaga} from '@store/modules/Users/sagas/getUserByIdSaga';
import {takeLeading} from 'redux-saga/effects';

export const usersWatchers = [
  takeLeading(UsersActions.GET_USER_BY_ID.START.type, getUserByIdSaga),
];
