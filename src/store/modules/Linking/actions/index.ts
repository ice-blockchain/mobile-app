// SPDX-License-Identifier: ice License 1.0

import {createAction} from '@store/utils/actions/createAction';

const HANDLE_URL = createAction('HANDLE_URL', {
  // In case of handling urls from linking (caught by the app)
  // we don't use Linking.openUrl to prevent recursivly
  // fired and caught deeplinks, e.g. from firebase: com.googleusercontent.apps...
  STATE: (url: string, handledInApp?: boolean) => ({url, handledInApp}),
});

export const LinkingActions = Object.freeze({
  HANDLE_URL,
});
