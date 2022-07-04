// SPDX-License-Identifier: BUSL-1.1

import {Avatar} from '@components/Avatar';
import {KeyboardDismiss, stopPropagination} from '@components/KeyboardDismiss';
import {COLORS} from '@constants/colors';
import {countriesCode, ICountryCode} from '@constants/countries';
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
import {SaveButton} from '@screens/SettingsFlow/PersonalInformation/components/SaveButton';
import {useKeyboardAnimatedStyles} from '@screens/SettingsFlow/PersonalInformation/hooks/useKeyboardAnimatedStyles';
import {t} from '@translations/i18n';
import React, {memo, useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {rem} from 'rn-units';

const mockUserData = {
  name: 'Johnny Alexander',
  surname: 'Smithsonian',
  country: countriesCode[0],
  city: 'Beverly Hills',
};

export const PersonalInformation = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();

  const [hasChanges, setHasChanges] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countriesCode[0]);
  const [isCountrySearchVisible, setCountrySearchVisibility] = useState(false);

  const onChangePhonePress = useCallback(
    () => navigation.navigate('ConfirmNewPhone'),
    [navigation],
  );

  const onCountrySelect = useCallback((country: ICountryCode) => {
    setSelectedCountry(country);
    setHasChanges(true);
  }, []);

  const onChangeSomething = useCallback((_: string) => {
    setHasChanges(true);
  }, []);

  const {animatedCardStyle, animatedAvatarStyle, animatedBodyStyle} =
    useKeyboardAnimatedStyles();

  return (
    <KeyboardDismiss onDismiss={() => setCountrySearchVisibility(false)}>
      <View style={styles.container}>
        <Header
          color={COLORS.white}
          title={t('personal_information.title')}
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
            <View style={styles.bodyInner} {...stopPropagination}>
              {
                // place button here with absolute positioning so it'd be underneath phone country select
                hasChanges && (
                  <SaveButton
                    style={styles.buttonPosition}
                    onPress={() => {}}
                  />
                )
              }
              <ListControlInput
                label={t('personal_information.first_name')}
                textContentType="name"
                defaultValue={mockUserData.name}
                onChangeText={onChangeSomething}
              />
              <ListControlSeparator />
              <ListControlInput
                label={t('personal_information.last_name')}
                textContentType="familyName"
                defaultValue={mockUserData.surname}
                onChangeText={onChangeSomething}
              />
              <ListControlSeparator />
              <ListControlAction
                label={t('personal_information.phone')}
                action={t('buttons.change').toUpperCase()}
                value={'+1 0712 345 678'}
                onPress={onChangePhonePress}
              />
              <ListControlSeparator />
              <ListControlCountry
                label={t('personal_information.country')}
                selectedCountry={selectedCountry}
                isCountrySearchVisible={isCountrySearchVisible}
                setCountrySearchVisibility={setCountrySearchVisibility}
                onCountrySelect={onCountrySelect}
              />
              <ListControlSeparator />
              <ListControlInput
                label={t('personal_information.city')}
                textContentType="addressCity"
                defaultValue={mockUserData.city}
                onChangeText={onChangeSomething}
              />
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    </KeyboardDismiss>
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
});
