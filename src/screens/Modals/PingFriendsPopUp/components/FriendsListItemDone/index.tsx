// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {getReferralUserSelector} from '@store/modules/Referrals/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {CheckMarkThinIcon} from '@svg/CheckMarkThinIcon';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  userId: string;
};

export const FriendsListItemDone = ({userId}: Props) => {
  const {pinged} = useSelector(
    getReferralUserSelector({
      userId,
    }),
  );

  const isPingInProgress = useSelector(
    isLoadingSelector.bind(null, ReferralsActions.PING_REFERRAL(userId)),
  );

  if (!pinged || !isPingInProgress) {
    return null;
  }

  return (
    <View style={[styles.iconContainer, styles.completed]}>
      <CheckMarkThinIcon width={rem(10)} height={rem(10)} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: rem(20),
    height: rem(20),
    borderRadius: rem(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  completed: {
    backgroundColor: COLORS.shamrock,
  },
});
