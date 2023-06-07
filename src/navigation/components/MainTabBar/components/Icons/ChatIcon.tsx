// SPDX-License-Identifier: ice License 1.0

import {Badge} from '@components/Badge';
import {ChatActiveIcon} from '@svg/ChatActiveIcon';
import {ChatInactiveIcon} from '@svg/ChatInactiveIcon';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  focused: boolean;
};

const ICON_SIZE = rem(24);

export const ChatIcon = ({focused}: Props) => {
  // TODO: switch to a real data
  const count = 3;

  return (
    <View>
      {focused ? (
        <ChatActiveIcon width={ICON_SIZE} height={ICON_SIZE} />
      ) : (
        <ChatInactiveIcon width={ICON_SIZE} height={ICON_SIZE} />
      )}

      {count > 0 ? <Badge style={styles.badge} value={count} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -7,
    right: -4,
  },
});
