// SPDX-License-Identifier: BUSL-1.1

import {IconCard, IconCardSkeleton} from '@components/Cards/IconCard';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ViewAllButton} from '@screens/ProfileFlow/Profile/components/Role/components/ViewAllButton';
import {SectionHeader} from '@screens/ProfileFlow/Profile/components/SectionHeader';
import {Pioneer} from '@svg/Roles/Pioneer';
import {t} from '@utils/i18n';
import React, {memo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

export const Role = memo(() => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 2000);

  return (
    <>
      <SectionHeader
        title={t('profile.my_role').toUpperCase()}
        showViewAll={false}
      />
      {loading ? (
        <IconCardSkeleton containerStyle={styles.card} />
      ) : (
        <IconCard
          renderIcon={Pioneer}
          title={'Pioneer'}
          description={'Are you flesh and blood?'}
          containerStyle={styles.card}
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

const styles = StyleSheet.create({
  card: {
    marginTop: rem(12),
  },
});
