// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {Images} from '@images';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  CurrentRoleCard,
  CurrentRoleSkeleton,
} from '@screens/ProfileFlow/Profile/components/Role/components/CurrentRoleCard';
import {AchievementsSelectors} from '@store/modules/Achievements/selectors';
import {t} from '@translations/i18n';
import React, {memo, useState} from 'react';
import {useSelector} from 'react-redux';

type Props = {
  user: User | null;
};

export const Role = memo(({user}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 2000);

  const roleType = useSelector(AchievementsSelectors.getRoleType);

  return (
    <>
      {loading ? (
        <CurrentRoleSkeleton />
      ) : (
        <CurrentRoleCard
          imageSource={Images.roles[roleType]}
          imageSourceHidden={Images.roles[`${roleType}Inactive`]}
          title={t(`roles.${roleType}.title`)}
          description={t(`roles.${roleType}.description`)}
          user={user}
          onNextPress={() => {
            navigation.navigate('Roles', {userId: user?.id});
          }}
        />
      )}
    </>
  );
});
