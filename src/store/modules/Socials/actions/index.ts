// SPDX-License-Identifier: ice License 1.0

import {SocialsShare} from '@store/modules/Socials/types';
import {createAction} from '@store/utils/actions/createAction';

const SET_SOCIALS = createAction('SOCIALS/SET_SOCIALS', {
  STATE: (payload: {userId: string; socials: SocialsShare[]}) => payload,
});

export const SocialsActions = Object.freeze({
  SET_SOCIALS,
});
