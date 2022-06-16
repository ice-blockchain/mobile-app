// SPDX-License-Identifier: BUSL-1.1

import {
  RoleCard,
  RoleCardSkeleton,
} from '@screens/Profile/components/Role/components/RoleCard';
import {SectionHeader} from '@screens/Profile/components/SectionHeader';
import {Pioneer} from '@svg/Roles/Pioneer';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const Role = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 2000);

  return (
    <View style={styles.container}>
      <SectionHeader title={'MY ROLE'} onViewAllPress={() => {}} />
      {loading ? (
        <RoleCardSkeleton />
      ) : (
        <RoleCard
          renderIcon={Pioneer}
          title={'Pioneer'}
          description={'Are you flesh and blood?'}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: rem(28),
  },
});
