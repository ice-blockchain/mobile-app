// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {getReferralUserSelector} from '@store/modules/Referrals/selectors';
import {CheckMarkThinIcon} from '@svg/CheckMarkThinIcon';
import isNil from 'lodash/isNil';
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

  if (isNil(pinged)) {
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
