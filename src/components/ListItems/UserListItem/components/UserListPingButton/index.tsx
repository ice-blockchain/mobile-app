// SPDX-License-Identifier: ice License 1.0

import {UserListItemButton} from '@components/ListItems/UserListItem/components/UserListItemButton';
import {COLORS} from '@constants/colors';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {getReferralUserSelector} from '@store/modules/Referrals/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {PingIcon} from '@svg/PingIcon';
import {t} from '@translations/i18n';
import isNil from 'lodash/isNil';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

type Props = {
  userId: string;
};

export const UserListPingButton = ({userId}: Props) => {
  const dispatch = useDispatch();

  const {pinged} = useSelector(
    getReferralUserSelector({
      userId,
    }),
  );

  const isPingInProgress = useSelector(
    isLoadingSelector.bind(null, ReferralsActions.PING_REFERRAL(userId)),
  );

  const isDisabled = pinged || isPingInProgress;

  const onPress = () => {
    dispatch(
      ReferralsActions.PING_REFERRAL(userId).START.create({
        userId,
      }),
    );
  };

  if (isNil(pinged)) {
    return null;
  }

  return (
    <UserListItemButton
      disabled={isDisabled}
      icon={
        <PingIcon color={isDisabled ? COLORS.cadetBlue : COLORS.primaryDark} />
      }
      text={t('users.ping')}
      onPress={onPress}
    />
  );
};
