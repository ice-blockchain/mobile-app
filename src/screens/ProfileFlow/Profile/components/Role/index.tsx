// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {Images} from '@images';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CurrentRoleCard} from '@screens/ProfileFlow/Profile/components/Role/components/CurrentRoleCard';
import {AchievementsSelectors} from '@store/modules/Achievements/selectors';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {useSelector} from 'react-redux';

type Props = {
  user: User | null;
  isOwner?: boolean;
};

export const Role = memo(({user, isOwner}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();

  const roleType = useSelector(
    AchievementsSelectors.getRoleTypeByUserId({userId: user?.id}),
  );

  return (
    <>
      <CurrentRoleCard
        isOwner={isOwner}
        imageSource={Images.roles[roleType]}
        imageSourceHidden={Images.roles[`${roleType}Inactive`]}
        title={t(`roles.${roleType}.title`)}
        description={t(`roles.${roleType}.subtitle`)}
        user={user}
        onNextPress={() => {
          navigation.navigate('Roles', {userId: user?.id});
        }}
      />
    </>
  );
});
