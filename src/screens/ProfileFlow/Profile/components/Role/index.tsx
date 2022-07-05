// SPDX-License-Identifier: BUSL-1.1

import {
  ImageCardCompact,
  ImageCardCompactSkeleton,
} from '@components/Cards/ImageCardCompact';
import {Images} from '@images';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ViewAllButton} from '@screens/ProfileFlow/Profile/components/Role/components/ViewAllButton';
import {SectionHeader} from '@screens/ProfileFlow/Profile/components/SectionHeader';
import {t} from '@translations/i18n';
import React, {memo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

export const Role = memo(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 2000);

  return (
    <>
      <SectionHeader
        title={t('profile.my_role').toUpperCase()}
        showViewAll={false}
      />
      {loading ? (
        <ImageCardCompactSkeleton containerStyle={styles.card} />
      ) : (
        <ImageCardCompact
          imageSource={Images.roles.pioneer}
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
