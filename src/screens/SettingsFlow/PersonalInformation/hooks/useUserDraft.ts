// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {pick} from 'lodash';
import {useEffect, useMemo, useState} from 'react';

export const useUserDraft = (user: User) => {
  const userDraftProps: (keyof User)[] = useMemo(
    () => [
      'username',
      'firstName',
      'lastName',
      'country',
      'city',
      'profilePicture',
    ],
    [],
  );

  const [userDraft, setUserDraft] = useState(pick(user, userDraftProps));

  const changes = (Object.keys(userDraft) as (keyof typeof userDraft)[]).filter(
    prop => (user[prop] || userDraft[prop]) && user[prop] !== userDraft[prop],
  );

  useEffect(() => {
    if (changes.length === 0) {
      setUserDraft(pick(user, userDraftProps));
    }
  }, [user, userDraftProps, changes.length]);

  return {user, userDraft, setUserDraft, changes};
};
