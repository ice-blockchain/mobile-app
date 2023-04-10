// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {LinesBackground} from '@components/LinesBackground';
import {RefreshIceIcon} from '@components/RefreshControl';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {HEADER_HEIGHT} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
import {AvatarHeader} from '@screens/ProfileFlow/Profile/components/AvatarHeader';
import {Badges} from '@screens/ProfileFlow/Profile/components/Badges';
import {DynamicHeight} from '@screens/ProfileFlow/Profile/components/DynamicHeight';
import {Invite} from '@screens/ProfileFlow/Profile/components/Invite';
import {MiningCalculator} from '@screens/ProfileFlow/Profile/components/MiningCalculator';
import {NotFound} from '@screens/ProfileFlow/Profile/components/NotFound';
import {Role} from '@screens/ProfileFlow/Profile/components/Role';
import {
  USER_INFO_HEIGHT,
  UserInfo,
} from '@screens/ProfileFlow/Profile/components/UserInfo';
import {useOnRefresh} from '@screens/ProfileFlow/Profile/hooks/useOnRefresh';
import {userSelector} from '@store/modules/Account/selectors';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {UsersActions} from '@store/modules/Users/actions';
import {userByIdSelector} from '@store/modules/Users/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {rem, screenHeight} from 'rn-units';

export const Profile = memo(() => {
  const authUser = useSelector(userSelector) as User;
  const route = useRoute<RouteProp<MainStackParamList, 'UserProfile'>>();
  const isOwner = !route.params || route.params.userId === authUser?.id;
  const userId = isOwner ? authUser.id : route.params?.userId;
  const animatedIndex = useSharedValue(0);

  const {top: topInset} = useSafeAreaInsets();
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

  const userExists = !!user;

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

  const snapPointsData = useMemo(() => {
    const collapsed = screenHeight - HEADER_HEIGHT - topInset;

    const expanded =
      screenHeight - USER_INFO_HEIGHT - HEADER_HEIGHT - topInset - rem(20);

    return {
      points: [expanded, collapsed],
      delta: Math.abs(collapsed - expanded),
    };
  }, [topInset]);

  const animatedImageContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          animatedIndex.value,
          [0, 1],
          [0, -snapPointsData.delta],
          {extrapolateLeft: Extrapolate.CLAMP},
        ),
      },
    ],
  }));

  const animatedBorderRadius = useAnimatedStyle(() => {
    /**
     * withTiming is required here to make border radius
     * animation more smooth
     * Without it after animation completed - animated corner is blinking
     */
    const borderRadius = withTiming(
      interpolate(
        animatedIndex.value,
        [0, 1],
        [commonStyles.baseSubScreen.borderTopLeftRadius, 0],
      ),
      {duration: 100},
    );
    return {
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
    };
  });

  return (
    <View style={commonStyles.flexOne}>
      <AvatarHeader
        user={user}
        animatedIndex={animatedIndex}
        isLoading={isLoading}
        isOwner={isOwner}
      />

      <Animated.View
        style={[styles.imageContainer, animatedImageContainerStyle]}>
        <LinesBackground />

        {userExists && <UserInfo user={user} />}

        <RefreshIceIcon
          theme={'dark-content'}
          refreshing={false}
          translateY={translateY}
        />
      </Animated.View>

      <DynamicHeight
        snapPoints={snapPointsData.points}
        animatedIndex={animatedIndex}>
        <Animated.View
          style={[
            commonStyles.flexOne,
            animatedBorderRadius,
            {backgroundColor: COLORS.white},
          ]}>
          {userExists && (
            <>
              <Role isOwner={isOwner} user={user} />
              <Badges user={user} />
              <Invite style={styles.inviteSection} />
              <MiningCalculator />
            </>
          )}
          {!userExists && !isLoading && <NotFound />}
        </Animated.View>
      </DynamicHeight>
    </View>
  );
});

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: rem(20),
    flexGrow: 1,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: rem(30),
    borderTopRightRadius: rem(30),
  },
  inviteSection: {marginTop: rem(15)},
});
