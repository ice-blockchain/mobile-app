// SPDX-License-Identifier: BUSL-1.1

import InviteFriendsButton from '@screens/Home/components/Content/components/InviteFriendsButton';
import {TeamHomeScreen} from '@screens/Home/components/Content/components/Team';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

interface HomeContentProps {}

export const HomeContent = ({}: HomeContentProps) => {
  return (
    <View style={styles.container}>
      <InviteFriendsButton />
      <TeamHomeScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: rem(24),
  },
});
