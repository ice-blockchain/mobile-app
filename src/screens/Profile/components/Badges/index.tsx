// SPDX-License-Identifier: BUSL-1.1

import {BadgeList} from '@screens/Profile/components/Badges/components/BadgeList';
import React, {useState} from 'react';

export const Badges = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 2000);

  return <BadgeList loading={loading} data={data} />;
};
