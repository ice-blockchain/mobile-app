// SPDX-License-Identifier: BUSL-1.1

import {
  SegmentedControl,
  SegmentedControlProps,
} from '@components/SegmentedControl';
import {COLORS} from '@constants/colors';
import {ContactsIcon} from '@screens/Team/assets/Contacts';
import {TierOneIcon} from '@svg/TierOneIcon';
import {TierTwoIcon} from '@svg/TierTwoIcon';
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
        <ContactsIcon fill={active ? COLORS.white : COLORS.darkBlue} />
        <Text style={{color: active ? COLORS.white : COLORS.darkBlue}}>
          {translate('team.contacts_tab')}
        </Text>
      </>
    ),
    key: 'Contacts',
  },
  {
    renderText: (active: boolean) => (
      <>
        <TierOneIcon fill={active ? COLORS.white : COLORS.darkBlue} />
        <Text style={{color: active ? COLORS.white : COLORS.darkBlue}}>
          {translate('team.tierOne_tab')}
        </Text>
      </>
    ),
    key: 'TierOne',
  },
  {
    renderText: (active: boolean) => (
      <>
        <TierTwoIcon fill={active ? COLORS.white : COLORS.darkBlue} />
        <Text style={{color: active ? COLORS.white : COLORS.darkBlue}}>
          {translate('team.tierTwo_tab')}
        </Text>
      </>
    ),
    key: 'TierTwo',
  },
] as const;

export function TiersSwitcher(
  props: Omit<SegmentedControlProps, 'segments'>,
): React.ReactElement {
  return <SegmentedControl {...props} segments={TABS} />;
}
