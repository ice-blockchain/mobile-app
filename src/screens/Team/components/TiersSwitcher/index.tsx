// SPDX-License-Identifier: BUSL-1.1

import TabBar from '@components/TabBar';
import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {rem, screenWidth} from 'rn-units';

type TiersSwitcherProps = {style: StyleProp<ViewStyle>};

export default function TiersSwitcher({
  ...rest
}: TiersSwitcherProps): React.ReactElement {
  return (
    <TabBar
      {...rest}
      style={styles.wrapper}
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

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    width: screenWidth - 48,
  },
  counter: {
    position: 'absolute',
    marginTop: rem(3),
    right: rem(15),
  },
});
