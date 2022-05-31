// SPDX-License-Identifier: BUSL-1.1

import InviteFriendsButton from '@screens/Home/components/Content/components/InviteFriendsButton';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

interface HomeContentProps {}

export const HomeContent = ({}: HomeContentProps) => {
  return (
    <View style={styles.container}>
      <InviteFriendsButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: rem(24),
    marginHorizontal: rem(23),
  },
});
