// SPDX-License-Identifier: ice License 1.0

import {SocialsShare} from '@store/modules/Socials/types';
import {createAction} from '@store/utils/actions/createAction';

const SOCIALS_LOAD = createAction('SOCIALS/SOCIALS_LOAD', {
  START: () => {},
  SUCCESS: (payload: {userId: string; socials: SocialsShare[]}) => payload,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

export const SocialsActions = Object.freeze({
  SOCIALS_LOAD,
});
