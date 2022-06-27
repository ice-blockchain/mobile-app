// SPDX-License-Identifier: BUSL-1.1

import {Tab, TabBar} from '@components/TabBar';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

type TiersSwitcherProps = {
  style?: StyleProp<ViewStyle>;
  onPress?: (tab?: Tab, index?: number) => void;
};

export const Tabs = {
  contacts: {
    text: 'team.contacts_tab',
    screen: 'Contacts',
  },
  tierOne: {
    text: 'team.tierOne_tab',
    screen: 'TierOne',
  },
  tierTwo: {
    text: 'team.tierTwo_tab',
    screen: 'TierTwo',
  },
};

export function TiersSwitcher({
  style = {},
  onPress = () => {},
  ...rest
}: TiersSwitcherProps): React.ReactElement {
  return (
    <TabBar
      {...rest}
      style={style}
      tabs={Object.values(Tabs)}
      onPress={tab => {
        onPress(tab);
      }}
    />
  );
}
