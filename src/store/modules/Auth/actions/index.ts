// SPDX-License-Identifier: BUSL-1.1

import {createAction} from '@store/utils/actions/createAction';

type Params = {
  email: string;
  isMfaEnabled: boolean;
  issuer: string;
  phoneNumber: string | null;
  publicAddress: string;
};

const STORE_USER_DATA = createAction('STORE_USER_DATA', {
  STATE: (data: Params) => ({data}),
});

const AuthActions = Object.freeze({
  STORE_USER_DATA,
});

export default AuthActions;
