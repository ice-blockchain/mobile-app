// SPDX-License-Identifier: ice License 1.0

import {ReferralType} from '@api/user/types';
import {stopPropagation} from '@components/KeyboardDismiss';
import {isLiteTeam} from '@constants/featureFlags';
import {ActiveUsers} from '@screens/Team/components/TierList/components/Header/components/ActiveUsers';
import {Earnings} from '@screens/Team/components/TierList/components/Header/components/Earnings';
import {useActiveUsersWalkthrough} from '@screens/Team/components/TierList/components/Header/hooks/useActiveUsersWalkthrough';
import {useEarningsWalkthrough} from '@screens/Team/components/TierList/components/Header/hooks/useEarningsWalkthrough';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  referralType: ReferralType;
  focused: boolean;
};

export const ListHeader = ({referralType, focused}: Props) => {
  const {
    elementRef: activeUsersElementRef,
    onElementLayout: onActiveUsersElementLayout,
  } = useActiveUsersWalkthrough({
    referralType,
    focused,
  });
  const {
    elementRef: earningsElementRef,
    onElementLayout: onEarningsElementLayout,
  } = useEarningsWalkthrough({
    referralType,
    focused,
  });

  return (
    <View {...stopPropagation}>
      <View style={styles.header}>
        <View ref={activeUsersElementRef} onLayout={onActiveUsersElementLayout}>
          <ActiveUsers referralType={referralType} />
        </View>
        {!isLiteTeam && (
          <View ref={earningsElementRef} onLayout={onEarningsElementLayout}>
            <Earnings referralType={referralType} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rem(22),
  },
});
