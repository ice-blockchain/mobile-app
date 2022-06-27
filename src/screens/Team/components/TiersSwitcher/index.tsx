// SPDX-License-Identifier: BUSL-1.1

import {SegmentedControl} from '@components/TabBar';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
  onPress: (tab: typeof TABS[number]) => void;
};

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

export function TiersSwitcher({
  style = {},
  onPress,
  ...rest
}: Props): React.ReactElement {
  return (
    <SegmentedControl
      {...rest}
      style={style}
      segments={TABS}
      onPress={index => {
        onPress(TABS[index]);
      }}
    />
  );
}
