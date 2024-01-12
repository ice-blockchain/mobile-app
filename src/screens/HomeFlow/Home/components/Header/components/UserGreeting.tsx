// SPDX-License-Identifier: ice License 1.0

import {Avatar} from '@components/Avatar/Avatar';
import {Touchable} from '@components/Touchable';
import {isLightDesign} from '@constants/featureFlags';
import {MainTabsParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GreetingText} from '@screens/HomeFlow/Home/components/Header/components/GreetingText';
import {useVerifiedTooltip} from '@screens/HomeFlow/Home/components/Header/components/hooks/useVerifiedTooltip';
import {userSelector, verifiedSelector} from '@store/modules/Account/selectors';
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
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {AnimatedStyleProp} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units/index';

type UserGreetingProps = {
  disabled: boolean;
  animatedStyle?: AnimatedStyleProp<ViewStyle | ImageStyle | TextStyle>;
};

export const UserGreeting = ({disabled, animatedStyle}: UserGreetingProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainTabsParamList>>();
  const user = useSelector(userSelector);
  const verified = useSelector(verifiedSelector);
  const {chevronRef, showTooltip} = useVerifiedTooltip(1);

  const openProfile = () => {
    if (!isLightDesign) {
      navigation.navigate('ProfileTab');
    }
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
              <Text style={styles.usernameText}>
                {buildUsernameWithPrefix(user.username)}
              </Text>
              {verified && (
                <View ref={chevronRef} collapsable={false}>
                  <TouchableWithoutFeedback onPress={showTooltip}>
                    <VerifiedSvg style={styles.badge} />
                  </TouchableWithoutFeedback>
                </View>
              )}
            </View>
          )}
        </Touchable>
      </Animated.View>
    </View>
  );
};

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
    marginLeft: rem(4),
  },
});
