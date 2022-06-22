// SPDX-License-Identifier: BUSL-1.1

import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BadgeList} from '@screens/ProfileFlow/Profile/components/Badges/components/BadgeList';
import {BADGE_CATEGORIES} from '@screens/ProfileFlow/Profile/components/Badges/mockData';
import {SectionHeader} from '@screens/ProfileFlow/Profile/components/SectionHeader';
import {t} from '@translations/i18n';
import React, {memo, useCallback, useState} from 'react';

export const Badges = memo(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const onViewAllPress = useCallback(
    () => navigation.navigate('MyBadges'),
    [navigation],
  );
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 2000);

  return (
    <>
      <SectionHeader
        title={t('profile.my_badges').toUpperCase()}
        showViewAll={true}
        onViewAllPress={onViewAllPress}
      />
      <BadgeList loading={loading} data={BADGE_CATEGORIES} />
    </>
  );
});
