// SPDX-License-Identifier: ice License 1.0

import {RefreshIceIcon} from '@components/RefreshControl';
import {commonStyles} from '@constants/styles';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {AvatarHeader} from '@screens/ProfileFlow/Profile/components/AvatarHeader';
import {Badges} from '@screens/ProfileFlow/Profile/components/Badges';
import {DynamicContainer} from '@screens/ProfileFlow/Profile/components/DynamicContainer';
import {Invite} from '@screens/ProfileFlow/Profile/components/Invite';
import {MiningCalculator} from '@screens/ProfileFlow/Profile/components/MiningCalculator';
import {NotFound} from '@screens/ProfileFlow/Profile/components/NotFound';
import {Role} from '@screens/ProfileFlow/Profile/components/Role';
import {StaticContainer} from '@screens/ProfileFlow/Profile/components/StaticContainer';
import {UserInfo} from '@screens/ProfileFlow/Profile/components/UserInfo';
import {useFetchData} from '@screens/ProfileFlow/Profile/hooks/useFetchData';
import {useOnRefresh} from '@screens/ProfileFlow/Profile/hooks/useOnRefresh';
import {useUserData} from '@screens/ProfileFlow/Profile/hooks/useUserData';
import React, {memo} from 'react';
import {View} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';

export const Profile = memo(() => {
  useFocusStatusBar({style: 'dark-content'});

  const {userId, isOwner, user, isUserLoading} = useUserData();
  useFetchData({userId, isOwner});

  const animatedIndex = useSharedValue(0);

  const {translateY} = useOnRefresh({animatedIndex, userId, isOwner});

  return (
    <View style={commonStyles.flexOne}>
      <AvatarHeader
        user={user}
        animatedIndex={animatedIndex}
        isLoading={isUserLoading}
        isOwner={isOwner}
      />

      <StaticContainer animatedIndex={animatedIndex}>
        <UserInfo user={user} />

        <View>
          <RefreshIceIcon
            theme={'dark-content'}
            refreshing={false}
            translateY={translateY}
          />
        </View>
      </StaticContainer>

      <DynamicContainer animatedIndex={animatedIndex}>
        {!!user && (
          <>
            <Role isOwner={isOwner} user={user} />
            <Badges isOwner={isOwner} user={user} />
            <Invite />
            <MiningCalculator />
          </>
        )}
        {!user && !isUserLoading && <NotFound />}
      </DynamicContainer>
    </View>
  );
});
