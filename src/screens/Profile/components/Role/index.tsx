// SPDX-License-Identifier: BUSL-1.1

import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  RoleCard,
  RoleCardSkeleton,
} from '@screens/Profile/components/Role/components/RoleCard';
import {ViewAllButton} from '@screens/Profile/components/Role/components/ViewAllButton';
import {Pioneer} from '@svg/Roles/Pioneer';
import React, {memo, useState} from 'react';

export const Role = memo(() => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 2000);

  return (
    <>
      {loading ? (
        <RoleCardSkeleton />
      ) : (
        <RoleCard
          renderIcon={Pioneer}
          title={'Pioneer'}
          description={'Are you flesh and blood?'}
        />
      )}
      <ViewAllButton
        onPress={() => {
          navigation.navigate('MyRoles');
        }}
      />
    </>
  );
});
