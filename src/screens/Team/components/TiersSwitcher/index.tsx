// SPDX-License-Identifier: BUSL-1.1

import TabBar from '@components/TabBar';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

type TiersSwitcherProps = {style?: StyleProp<ViewStyle>};

export default function TiersSwitcher({
  style = {},
  ...rest
}: TiersSwitcherProps): React.ReactElement {
  return (
    <TabBar
      {...rest}
      style={style}
      tabs={[
        {
          text: 'team.contacts',
          screen: 'Contacts',
        },
        {
          text: 'team.tierOne',
          screen: 'TierOne',
        },
        {
          text: 'team.tierTwo',
          screen: 'TierTwo',
        },
      ]}
      onPress={tab => {
        console.log(tab);
      }}
    />
  );
}
