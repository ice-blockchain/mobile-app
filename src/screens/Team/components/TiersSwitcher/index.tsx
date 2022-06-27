// SPDX-License-Identifier: BUSL-1.1

import {
  SegmentedControl,
  SegmentedControlProps,
} from '@components/SegmentedControl';
import React from 'react';

export const TABS = [
  {
    text: 'team.contacts_tab',
    key: 'Contacts',
  },
  {
    text: 'team.tierOne_tab',
    key: 'TierOne',
  },
  {
    text: 'team.tierTwo_tab',
    key: 'TierTwo',
  },
] as const;

export function TiersSwitcher(
  props: Omit<SegmentedControlProps, 'segments'>,
): React.ReactElement {
  return <SegmentedControl {...props} segments={TABS} />;
}
