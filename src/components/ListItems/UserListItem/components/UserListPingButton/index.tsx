// SPDX-License-Identifier: ice License 1.0

import {UserListItemButton} from '@components/ListItems/UserListItem/components/UserListItemButton';
import {COLORS} from '@constants/colors';
import {isLightDesign} from '@constants/featureFlags';
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

  const onPress = () => {
    navigation.navigate('PingReferralsPopUp', {userId});
  };

  if (isNil(pinged) || isLightDesign) {
    return null;
  }

  return (
    <UserListItemButton
      disabled={!!pinged}
      icon={<PingIcon color={pinged ? COLORS.cadetBlue : COLORS.primaryDark} />}
      text={t('users.ping')}
      onPress={onPress}
    />
  );
};
