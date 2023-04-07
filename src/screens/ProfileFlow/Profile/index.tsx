// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {LinesBackground} from '@components/LinesBackground';
import {RefreshIceIcon} from '@components/RefreshControl';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {HEADER_HEIGHT} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
import {AgendaContactTooltip} from '@screens/ProfileFlow/Profile/components/AgendaContactTooltip';
import {AvatarHeader} from '@screens/ProfileFlow/Profile/components/AvatarHeader';
import {Badges} from '@screens/ProfileFlow/Profile/components/Badges';
import {Invite} from '@screens/ProfileFlow/Profile/components/Invite';
import {LadderBar} from '@screens/ProfileFlow/Profile/components/LadderBar';
import {MiningCalculator} from '@screens/ProfileFlow/Profile/components/MiningCalculator';
import {Role} from '@screens/ProfileFlow/Profile/components/Role';
import {useOnRefresh} from '@screens/ProfileFlow/Profile/hooks/useOnRefresh';
import {userSelector} from '@store/modules/Account/selectors';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {contactsSelector} from '@store/modules/Contacts/selectors';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {UsersActions} from '@store/modules/Users/actions';
import {userByIdSelector} from '@store/modules/Users/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {t} from '@translations/i18n';
import {e164PhoneNumber} from '@utils/phoneNumber';
import {font} from '@utils/styles';
import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Contact} from 'react-native-contacts';
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

const NOT_FOUND_BG = require('./assets/images/notFoundBg.png');

const DEFAULT_CORNER_RADIUS = rem(30);

export const Profile = memo(() => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [contactDetails, setContactDetails] = useState<Contact>();
  const [refreshYPosition, setRefreshYPosition] = useState(0);
  const tabBarOffset = useBottomTabBarOffsetStyle();
  const authUser = useSelector(userSelector) as User;
  const route = useRoute<RouteProp<MainStackParamList, 'UserProfile'>>();
  const isOwner = !route.params || route.params.userId === authUser?.id;
  const userId = isOwner ? authUser.id : route.params?.userId;
  const animatedIndex = useSharedValue(0);

  const {top: topInset} = useSafeAreaInsets();
  const translateY = useDerivedValue(() =>
    interpolate(animatedIndex.value, [0, 0.1], [0, 100]),
  );

  const {} = useOnRefresh({animatedIndex, userId, isOwner});

  const contacts = useSelector(contactsSelector);
  useFocusStatusBar({style: 'dark-content'});

  const dispatch = useDispatch();

  const user = useSelector(
    isOwner ? userSelector : userByIdSelector(route.params.userId),
  );

  const isLoading = useSelector(
    isLoadingSelector.bind(null, UsersActions.GET_USER_BY_ID),
  );

  const userExist = !!user;
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

  useEffect(() => {
    if (user && user.phoneNumber && contacts?.length > 0) {
      const userContactDetails = contacts.find(contact => {
        return contact.phoneNumbers.find(phoneNumber => {
          const normalizedNumber = e164PhoneNumber(
            phoneNumber.number,
            user.country,
          );
          return normalizedNumber === user.phoneNumber;
        });
      });
      if (userContactDetails) {
        setContactDetails(userContactDetails);
      }
    }
  }, [contacts, user]);

  useFocusEffect(
    useCallback(() => {
      dispatch(AchievementsActions.USER_ACHIEVEMENTS_LOAD.START.create(userId));
    }, [dispatch, userId]),
  );

  const snapPointsData = useMemo(() => {
    const collapsed = screenHeight - HEADER_HEIGHT - topInset;

    const expanded =
      screenHeight - refreshYPosition - HEADER_HEIGHT - topInset - rem(20);

    return {
      points: [expanded, collapsed],
      delta: Math.abs(collapsed - expanded),
    };
  }, [topInset, refreshYPosition]);

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
    const borderRadius = withTiming(
      interpolate(animatedIndex.value, [0, 1], [DEFAULT_CORNER_RADIUS, 0]),
      {duration: 100},
    );
    return {
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.touchArea}>
        <AvatarHeader
          user={user}
          animatedIndex={animatedIndex}
          uri={user?.profilePictureUrl}
          isLoading={isLoading}
          isOwner={isOwner}
          contact={contactDetails}
          onContactPress={() => {
            setIsTooltipVisible(state => !state);
          }}
        />
        {contactDetails && isTooltipVisible && !isOwner && (
          <AgendaContactTooltip contact={contactDetails} />
        )}
      </View>

      <Animated.View
        style={[styles.imageContainer, animatedImageContainerStyle]}>
        <LinesBackground />

        <Text style={styles.usernameText} numberOfLines={1}>
          {`@${user?.username}` || ''}
        </Text>
        <View style={styles.ladderContainer}>
          {userExist && <LadderBar user={user} />}
          {!userExist && <View style={styles.emptyLadder} />}
        </View>

        <View
          onLayout={({nativeEvent}: LayoutChangeEvent) => {
            setRefreshYPosition(nativeEvent.layout.y);
          }}>
          <RefreshIceIcon
            theme={'dark-content'}
            refreshing={false}
            translateY={translateY}
          />
        </View>
      </Animated.View>

      <BottomSheet
        snapPoints={snapPointsData.points}
        handleComponent={null}
        handleHeight={0}
        animateOnMount={false}
        enableOverDrag
        animatedIndex={animatedIndex}
        overDragResistanceFactor={10}
        backgroundStyle={commonStyles.baseSubScreen}
        activeOffsetY={[-5, 5]}>
        <BottomSheetScrollView
          style={commonStyles.flexOne}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tabBarOffset.current}>
          <Animated.View
            style={[
              commonStyles.flexOne,
              animatedBorderRadius,
              {backgroundColor: COLORS.white},
            ]}>
            {userExist && (
              <>
                <Role isOwner={isOwner} user={user} />
                <Badges user={user} />
                <Invite style={styles.inviteSection} />
                <MiningCalculator />
              </>
            )}
            {!userExist && !isLoading && (
              <>
                <Image source={NOT_FOUND_BG} style={styles.notFoundBg} />
                <Text style={styles.notFoundTitle}>
                  {t('profile.not_found.title')}
                </Text>
                <Text style={styles.notFoundDescription}>
                  {t('profile.not_found.description')}
                </Text>
              </>
            )}
          </Animated.View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  cardContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },

  imageContainer: {
    marginTop: rem(20),
    flexGrow: 1,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: rem(30),
    borderTopRightRadius: rem(30),
  },

  ladderContainer: {
    marginTop: rem(15),
    marginBottom: rem(15),
  },
  usernameText: {
    marginTop: rem(67),
    alignSelf: 'center',
    ...font(17, 20.4, 'semibold'),
  },
  touchArea: {
    zIndex: 1,
  },
  emptyLadder: {
    height: rem(75),
  },
  notFoundBg: {
    alignSelf: 'center',
    width: rem(245),
    height: rem(219),
  },
  notFoundTitle: {
    ...font(24, 29, 'black', 'primaryDark'),
    marginHorizontal: rem(20),
    textAlign: 'center',
    marginTop: rem(20),
    marginBottom: rem(16),
  },
  notFoundDescription: {
    ...font(14, 20, 'medium', 'secondary'),
    marginHorizontal: rem(20),
    textAlign: 'center',
  },
  inviteSection: {marginTop: rem(15)},
});
