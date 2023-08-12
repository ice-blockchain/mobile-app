// SPDX-License-Identifier: ice License 1.0

import {LottieView} from '@components/LottieView';
import {COLORS} from '@constants/colors';
import {LottieAnimations} from '@lottie';
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

export const ReferralsListItemDone = ({userId}: Props) => {
  const {pinged} = useSelector(
    getReferralUserSelector({
      userId,
    }),
  );

  const isPingInProgress = useSelector(
    isLoadingSelector.bind(null, ReferralsActions.PING_REFERRAL(userId)),
  );

  return (
    <>
      {pinged && (
        <View style={[styles.iconContainer, styles.completed]}>
          <CheckMarkThinIcon width={rem(10)} height={rem(10)} />
        </View>
      )}
      {isPingInProgress && (
        <View style={[styles.iconContainer, styles.animationContainer]}>
          <LottieView
            style={styles.animation}
            source={LottieAnimations.loadingLogoBlue}
            autoPlay={true}
            loop={true}
          />
        </View>
      )}
    </>
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
  animation: {
    width: rem(25),
    height: rem(25),
    alignSelf: 'center',
  },
  animationContainer: {
    justifyContent: 'center',
  },
  completed: {
    backgroundColor: COLORS.shamrock,
  },
});
