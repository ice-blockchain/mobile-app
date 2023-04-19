// SPDX-License-Identifier: ice License 1.0

import {SocialsShare} from '@store/modules/Socials/types';
import {createAction} from '@store/utils/actions/createAction';

const SOCIALS_LOAD = createAction('SOCIALS/SOCIALS_LOAD', {
  START: (userId: string) => ({userId}),
  SUCCESS: (payload: {userId: string; socials: SocialsShare[]}) => payload,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const SOCIALS_MARK_SHARED = createAction('SOCIALS/SOCIALS_MARK_SHARED', {
  START: (payload: {userId: string; social: SocialsShare}) => payload,
  SUCCESS: (payload: {userId: string; socials: SocialsShare[]}) => payload,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

export const SocialsActions = Object.freeze({
  SOCIALS_LOAD,
  SOCIALS_MARK_SHARED,
});
