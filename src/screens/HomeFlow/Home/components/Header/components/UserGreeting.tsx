// SPDX-License-Identifier: ice License 1.0

import {Avatar} from '@components/Avatar/Avatar';
import {Touchable} from '@components/Touchable';
import {MainTabsParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GreetingText} from '@screens/HomeFlow/Home/components/Header/components/GreetingText';
import {userSelector} from '@store/modules/Account/selectors';
import {VerifiedSvg} from '@svg/Verified';
import {isRTL} from '@translations/i18n';
import {font} from '@utils/styles';
import {buildUsernameWithPrefix} from '@utils/username';
import React from 'react';
import {
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {AnimatedStyleProp} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units/index';

type Props = {
  disabled: boolean;
  animatedStyle?: AnimatedStyleProp<ViewStyle | ImageStyle | TextStyle>;
};

export function UserGreeting({disabled, animatedStyle}: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainTabsParamList>>();
  const user = useSelector(userSelector);
  const openProfile = () => {
    navigation.navigate('ProfileTab');
  };

  const showVerifiedHint = () => {
    console.log('showVerifiedHint');
  };

  return (
    <View style={styles.container}>
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

      <Animated.View style={[styles.greeting, animatedStyle]}>
        <Touchable disabled={disabled} onPress={openProfile}>
          <GreetingText />
          {user?.username && (
            <View style={styles.usernameContainer}>
              {!isRTL && (
                <Touchable onPress={showVerifiedHint}>
                  <VerifiedSvg style={[styles.badge, styles.badgeRTL]} />
                </Touchable>
              )}
              <Text style={styles.usernameText}>
                {buildUsernameWithPrefix(user.username)}
              </Text>
              {isRTL && (
                <Touchable onPress={showVerifiedHint}>
                  <VerifiedSvg style={[styles.badge, styles.badgeNonRTL]} />
                </Touchable>
              )}
            </View>
          )}
        </Touchable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    marginLeft: rem(10),
    flex: 1,
  },
  usernameText: {
    marginTop: rem(3),
    ...font(15, 20, 'bold', 'downriver'),
    alignSelf: isRTL ? 'flex-start' : 'auto',
  },
  usernameContainer: {
    flexDirection: 'row',
  },
  badge: {
    marginTop: rem(5),
  },
  badgeRTL: {
    marginRight: rem(4),
  },
  badgeNonRTL: {
    marginLeft: rem(4),
  },
});
