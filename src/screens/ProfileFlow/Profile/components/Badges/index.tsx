// SPDX-License-Identifier: BUSL-1.1

import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BadgeList} from '@screens/ProfileFlow/Profile/components/Badges/components/BadgeList';
import {SectionHeader} from '@screens/ProfileFlow/Profile/components/SectionHeader';
import {t} from '@utils/i18n';
import React, {memo, useCallback, useState} from 'react';

export const Badges = memo(() => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const onViewAllPress = useCallback(
    () => navigation.navigate('MyBadges'),
    [navigation],
  );
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 2000);

  return (
    <>
      <SectionHeader
        title={t('profile.my_badges').toUpperCase()}
        showViewAll={true}
        onViewAllPress={onViewAllPress}
      />
      <BadgeList loading={loading} data={data} />
    </>
  );
});
