// SPDX-License-Identifier: ice License 1.0

import {UserListItem} from '@components/ListItems/UserListItem';
import {UserListPingButton} from '@components/ListItems/UserListItem/components/UserListPingButton';
import {usePingWalkthrough} from '@screens/Team/components/TierList/components/WalkthroughReferralItem/hooks/usePingWalkthrough';
import React from 'react';
import {View} from 'react-native';

export const WalkthroughReferralItem = ({userId}: {userId: string}) => {
  const {elementRef, onElementLayout} = usePingWalkthrough({userId});

  return (
    <UserListItem
      userId={userId}
      AdditionalInfoComponent={
        <View ref={elementRef} onLayout={onElementLayout}>
          <UserListPingButton userId={userId} />
        </View>
      }
    />
  );
};
