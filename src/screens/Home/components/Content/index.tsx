// SPDX-License-Identifier: BUSL-1.1

import {InviteButton} from '@components/InviteButton';
import {CompleteTheTask} from '@screens/Home/components/Content/components/CompleteTheTask';
import {TeamHomeScreen} from '@screens/Home/components/Content/components/Team';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

interface HomeContentProps {}

export const HomeContent = ({}: HomeContentProps) => {
  return (
    <View style={styles.container}>
      <InviteButton />
      <TeamHomeScreen />
      <CompleteTheTask />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: rem(24),
  },
});
