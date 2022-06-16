// SPDX-License-Identifier: BUSL-1.1

import {
  RoleCard,
  RoleCardSkeleton,
} from '@screens/Profile/components/Role/components/RoleCard';
import {Pioneer} from '@svg/Roles/Pioneer';
import React, {useState} from 'react';

export const Role = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 2000);

  return (
    <>
      {loading ? (
        <RoleCardSkeleton />
      ) : (
        <RoleCard
          renderIcon={Pioneer}
          title={'Pioneer'}
          description={'Are you flesh and blood?'}
        />
      )}
    </>
  );
};
