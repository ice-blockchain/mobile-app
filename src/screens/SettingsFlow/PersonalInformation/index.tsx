// SPDX-License-Identifier: BUSL-1.1

import {Avatar} from '@components/Avatar';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {LangButton} from '@navigation/components/Header/components/LangButton';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ListControlAction} from '@screens/SettingsFlow/PersonalInformation/components/ListControls/ListControlAction';
import {ListControlSeparator} from '@screens/SettingsFlow/PersonalInformation/components/ListControls/ListControlBase';
import {ListControlCountry} from '@screens/SettingsFlow/PersonalInformation/components/ListControls/ListControlCountry';
import {ListControlInput} from '@screens/SettingsFlow/PersonalInformation/components/ListControls/ListControlInput';
import {useKeyboardAnimatedStyles} from '@screens/SettingsFlow/PersonalInformation/hooks/useKeyboardAnimatedStyles';
import React, {memo, useCallback} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {font, rem} from 'rn-units';

export const PersonalInformation = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();

  const onChangePhonePress = useCallback(
    () => navigation.navigate('ConfirmNewPhone'),
    [navigation],
  );

  const {animatedCardStyle, animatedAvatarStyle, animatedBodyStyle} =
    useKeyboardAnimatedStyles();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Header
          color={COLORS.white}
          title={'Personal Information'}
          titlePreset={'small'}
          renderRightButtons={LangButton}
        />
        <Animated.View
          style={[styles.card, animatedCardStyle, bottomOffset.current]}>
          <Animated.View style={[styles.avatar, animatedAvatarStyle]}>
            <Avatar
              showPen
              uri="https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?b=1&k=20&m=1300972574&s=170667a&w=0&h=2nBGC7tr0kWIU8zRQ3dMg-C5JLo9H2sNUuDjQ5mlYfo="
            />
          </Animated.View>
          <Animated.View
            style={[styles.body, animatedBodyStyle, commonStyles.shadow]}>
            <View
              style={styles.bodyInner}
              onStartShouldSetResponder={_ => true}
              onTouchEnd={e => e.stopPropagation()}>
              <View style={styles.buttonPosition}>
                <TouchableOpacity onPress={() => {}}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <ListControlInput
                label="First name"
                textContentType="name"
                defaultValue="Johnny Alexander"
              />
              <ListControlSeparator />
              <ListControlInput
                label="Last name"
                textContentType="familyName"
                defaultValue="Smithsonian"
              />
              <ListControlSeparator />
              <ListControlAction
                label="Phone"
                action="CHANGE"
                value={'+1 0712 345 678'}
                onPress={onChangePhonePress}
              />
              <ListControlSeparator />
              <ListControlCountry label="Country" />
              <ListControlSeparator />
              <ListControlInput
                label="City"
                textContentType="addressCity"
                defaultValue="Beverly Hills"
              />
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.persianBlue,
  },
  card: {
    paddingTop: rem(12),
    borderTopLeftRadius: rem(20),
    borderTopRightRadius: rem(20),
    backgroundColor: COLORS.white,
    flex: 1,
  },
  avatar: {
    position: 'absolute',
    top: -rem(43),
    left: '50%',
    marginLeft: -rem(43),
  },
  body: {
    borderRadius: rem(16),
    marginHorizontal: SCREEN_SIDE_OFFSET,
    backgroundColor: COLORS.white,
  },
  bodyInner: {
    borderRadius: rem(16),
  },
  buttonPosition: {
    position: 'absolute',
    right: 0,
    bottom: -rem(60),
  },
  button: {
    height: rem(40),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rem(33),
    backgroundColor: COLORS.primary,
    borderRadius: rem(11),
  },
  buttonText: {
    fontFamily: FONTS.primary.black,
    fontSize: font(14),
    color: COLORS.white,
  },
});
