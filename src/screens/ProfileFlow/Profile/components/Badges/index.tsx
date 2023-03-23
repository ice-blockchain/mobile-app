// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {SectionHeader} from '@components/SectionHeader';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BadgeList} from '@screens/ProfileFlow/Profile/components/Badges/components/BadgeList';
import {LAST_BADGES} from '@screens/ProfileFlow/Profile/components/Badges/mockData';
import {userSelector} from '@store/modules/Account/selectors';
import {t} from '@translations/i18n';
import React, {memo, useCallback, useState} from 'react';
import {useSelector} from 'react-redux';

type Props = {
  user: User | null;
};

export const Badges = memo(({user}: Props) => {
  const authUser = useSelector(userSelector);
  const isOwner = user?.id === authUser?.id;

  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();

  const onViewAllPress = useCallback(
    () => navigation.navigate('Badges', {userId: user?.id}),
    [navigation, user],
  );
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 2000);

  const title = isOwner
    ? t('profile.my_badges.title')
    : t('profile.badges.title');

  return (
    <>
      <SectionHeader
        title={title.toUpperCase()}
        action={t('button.view_all')}
        onActionPress={onViewAllPress}
      />
      <BadgeList loading={loading} user={user} data={LAST_BADGES} />
    </>
  );
});
