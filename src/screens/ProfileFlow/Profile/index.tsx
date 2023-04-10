// SPDX-License-Identifier: ice License 1.0

import {RefreshIceIcon} from '@components/RefreshControl';
import {commonStyles} from '@constants/styles';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
import {AvatarHeader} from '@screens/ProfileFlow/Profile/components/AvatarHeader';
import {Badges} from '@screens/ProfileFlow/Profile/components/Badges';
import {DynamicContainer} from '@screens/ProfileFlow/Profile/components/DynamicContainer';
import {Invite} from '@screens/ProfileFlow/Profile/components/Invite';
import {MiningCalculator} from '@screens/ProfileFlow/Profile/components/MiningCalculator';
import {NotFound} from '@screens/ProfileFlow/Profile/components/NotFound';
import {Role} from '@screens/ProfileFlow/Profile/components/Role';
import {StaticContainer} from '@screens/ProfileFlow/Profile/components/StaticContainer';
import {UserInfo} from '@screens/ProfileFlow/Profile/components/UserInfo';
import {useOnRefresh} from '@screens/ProfileFlow/Profile/hooks/useOnRefresh';
import {userIdSelector, userSelector} from '@store/modules/Account/selectors';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {UsersActions} from '@store/modules/Users/actions';
import {userByIdSelector} from '@store/modules/Users/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import React, {memo, useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {
  interpolate,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';

export const Profile = memo(() => {
  const authUserId = useSelector(userIdSelector);
  const route = useRoute<RouteProp<MainStackParamList, 'UserProfile'>>();
  const isOwner = !route.params || route.params.userId === authUserId;
  const userId = route.params?.userId ?? authUserId;

  const animatedIndex = useSharedValue(0);

  const translateY = useDerivedValue(() =>
    interpolate(animatedIndex.value, [0, 0.1], [0, 100]),
  );

  useOnRefresh({animatedIndex, userId, isOwner});

  useFocusStatusBar({style: 'dark-content'});

  const dispatch = useDispatch();

  const user = useSelector(
    isOwner ? userSelector : userByIdSelector(route.params.userId),
  );

  const isLoading = useSelector(
    isLoadingSelector.bind(null, UsersActions.GET_USER_BY_ID),
  );

  useEffect(() => {
    if (!isOwner) {
      dispatch(UsersActions.GET_USER_BY_ID.START.create(route.params.userId));
      dispatch(
        TokenomicsActions.GET_RANKING_SUMMARY.START.create({
          userId: route.params.userId,
        }),
      );
    }
  }, [userId, dispatch, isOwner, route.params]);

  useFocusEffect(
    useCallback(() => {
      dispatch(AchievementsActions.USER_ACHIEVEMENTS_LOAD.START.create(userId));
    }, [dispatch, userId]),
  );

  return (
    <View style={commonStyles.flexOne}>
      <AvatarHeader
        user={user}
        animatedIndex={animatedIndex}
        isLoading={isLoading}
        isOwner={isOwner}
      />

      <StaticContainer animatedIndex={animatedIndex}>
        <UserInfo user={user} />

        <RefreshIceIcon
          theme={'dark-content'}
          refreshing={false}
          translateY={translateY}
        />
      </StaticContainer>

      <DynamicContainer animatedIndex={animatedIndex}>
        {!!user && (
          <>
            <Role isOwner={isOwner} user={user} />
            <Badges user={user} />
            <Invite />
            <MiningCalculator />
          </>
        )}
        {!user && !isLoading && <NotFound />}
      </DynamicContainer>
    </View>
  );
});
