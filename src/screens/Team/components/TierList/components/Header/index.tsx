// SPDX-License-Identifier: ice License 1.0

import {ReferralType} from '@api/user/types';
import {stopPropagation} from '@components/KeyboardDismiss';
import {ActiveUsers} from '@screens/Team/components/TierList/components/Header/components/ActiveUsers';
import {useActiveUsersWalkthrough} from '@screens/Team/components/TierList/components/Header/hooks/useActiveUsersWalkthrough';
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

  return (
    <View {...stopPropagation}>
      <View style={styles.header}>
        <View ref={activeUsersElementRef} onLayout={onActiveUsersElementLayout}>
          <ActiveUsers />
        </View>
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
