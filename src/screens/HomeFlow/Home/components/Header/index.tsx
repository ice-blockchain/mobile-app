// SPDX-License-Identifier: ice License 1.0

import {Avatar} from '@components/Avatar/Avatar';
import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {IceLabel} from '@components/Labels/IceLabel';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useTopOffsetStyle} from '@navigation/hooks/useTopOffsetStyle';
import {MainTabsParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GreetingText} from '@screens/HomeFlow/Home/components/Header/components/GreetingText';
import {MenuButton} from '@screens/HomeFlow/Home/components/Header/components/MenuButton';
import {useTransitionAnimation} from '@screens/HomeFlow/Home/components/Header/hooks/useTransitionAnimation';
import {userSelector} from '@store/modules/Account/selectors';
import {balanceSummarySelector} from '@store/modules/Tokenomics/selectors';
import {formatNumberString} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {SharedValue} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  translateY: SharedValue<number>;

  // scroll offset when to start transition animation from 1 state to another
  transitionOffset: number;
};

export const HomeHeader = memo(({translateY, transitionOffset}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainTabsParamList>>();

  const topOffset = useTopOffsetStyle();
  const user = useSelector(userSelector);
  const balanceSummary = useSelector(balanceSummarySelector);

  const {currentAnimationState, fromAnimatedStyle, toAnimatedStyle} =
    useTransitionAnimation({
      translateY,
      transitionOffset,
    });

  const openProfile = () => {
    navigation.navigate('ProfileTab');
  };

  return (
    <View style={[styles.container, topOffset.current]}>
      <View style={styles.body}>
        {user?.profilePictureUrl && (
          <Touchable onPress={openProfile}>
            <Avatar
              uri={user.profilePictureUrl}
              size={rem(36)}
              borderRadius={rem(16)}
              allowFullScreen={false}
            />
          </Touchable>
        )}
        <Animated.View style={[styles.greeting, fromAnimatedStyle]}>
          <Touchable
            disabled={currentAnimationState !== 'from'}
            onPress={openProfile}>
            <GreetingText />
            {user && (
              <Text style={styles.usernameText}>{`@${user.username}`}</Text>
            )}
          </Touchable>
        </Animated.View>

        <Animated.View
          pointerEvents={'none'}
          style={[StyleSheet.absoluteFill, styles.balance, toAnimatedStyle]}>
          <FormattedNumber
            number={
              balanceSummary ? formatNumberString(balanceSummary.total) : ''
            }
            bodyStyle={styles.balanceText}
            decimalsStyle={styles.balanceDecimalsText}
          />
          <IceLabel
            iconSize={16}
            iconOffsetY={0}
            color={COLORS.primaryDark}
            textStyle={styles.currencyText}
          />
        </Animated.View>

        <MenuButton />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  body: {
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    flexDirection: 'row',
    alignItems: 'center',
    height: rem(72),
  },
  balance: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  balanceText: {
    ...font(17, 21, 'black', 'primaryDark'),
  },
  balanceDecimalsText: {
    ...font(10, 12, 'black', 'primaryDark'),
    marginBottom: rem(10),
  },
  currencyText: {
    ...font(13, 21, 'semibold', 'primaryDark'),
  },
  greeting: {
    marginLeft: rem(10),
    flex: 1,
  },
  usernameText: {
    marginTop: rem(3),
    ...font(15, 18, 'bold', 'downriver'),
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    padding: rem(7),
  },
});
