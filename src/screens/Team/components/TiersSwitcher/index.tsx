// SPDX-License-Identifier: BUSL-1.1

import {
  SegmentedControl,
  SegmentedControlProps,
} from '@components/SegmentedControl';
import {InfoIconSvg} from '@svg/InfoIcon';
import {translate} from '@translations/i18n';
import React from 'react';
import {Text} from 'react-native';

export const TABS = [
  {
    /**
     * Custom render example
     */
    renderText: (active: boolean) => (
      <>
        <InfoIconSvg fill={active ? 'white' : 'blue'} />
        <Text style={{color: active ? 'white' : 'blue'}}>
          {translate('team.contacts_tab')}
        </Text>
      </>
    ),
    key: 'Contacts',
  },
  {
    text: translate('team.tierOne_tab'),
    key: 'TierOne',
  },
  {
    text: translate('team.tierTwo_tab'),
    key: 'TierTwo',
  },
] as const;

export function TiersSwitcher(
  props: Omit<SegmentedControlProps, 'segments'>,
): React.ReactElement {
  return <SegmentedControl {...props} segments={TABS} />;
}
