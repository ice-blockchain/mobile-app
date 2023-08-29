// SPDX-License-Identifier: ice License 1.0

import {UserListItemButton} from '@components/ListItems/UserListItem/components/UserListItemButton';
import {COLORS} from '@constants/colors';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getReferralUserSelector} from '@store/modules/Referrals/selectors';
import {PingIcon} from '@svg/PingIcon';
import {t} from '@translations/i18n';
import isNil from 'lodash/isNil';
import React from 'react';
import {useSelector} from 'react-redux';

type Props = {
  userId: string;
};

export const UserListPingButton = ({userId}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const {pinged} = useSelector(
    getReferralUserSelector({
      userId,
    }),
  );

  const isDisabled = pinged;

  const onPress = () => {
    navigation.navigate('PingReferralsPopUp');
  };

  if (isNil(pinged)) {
    return null;
  }

  return (
    <UserListItemButton
      disabled={!!isDisabled}
      icon={
        <PingIcon color={isDisabled ? COLORS.cadetBlue : COLORS.primaryDark} />
      }
      text={t('users.ping')}
      onPress={onPress}
    />
  );
};
