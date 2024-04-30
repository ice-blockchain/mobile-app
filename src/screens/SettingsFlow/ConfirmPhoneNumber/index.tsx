// SPDX-License-Identifier: ice License 1.0

import {ConfirmPhoneNumberForm} from '@components/Forms/ConfirmPhoneNumberForm';
import {KeyboardAvoider} from '@components/KeyboardAvoider';
import {UserAvatarHeader} from '@components/UserAvatarHeader';
import {commonStyles} from '@constants/styles';
import {useScrollEndOnKeyboardShown} from '@hooks/useScrollEndOnKeyboardShown';
import {Header} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {phoneVerificationStepSelector} from '@store/modules/Validation/selectors';
import {t} from '@translations/i18n';
import React, {memo, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const ConfirmPhoneNumber = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const {scrollRef} = useScrollEndOnKeyboardShown();
  const tabbarOffset = useBottomTabBarOffsetStyle();

  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();

  const phoneVerificationStep = useSelector(phoneVerificationStepSelector);

  useEffect(() => {
    if (phoneVerificationStep === 'phone') {
      navigation.navigate('PersonalInformation');
    }
  }, [navigation, phoneVerificationStep]);

  return (
    <KeyboardAvoider
      keyboardVerticalOffset={-tabbarOffset.current.paddingBottom + rem(20)}>
      <Header title={t('personal_information.title')} />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[styles.containerContent, tabbarOffset.current]}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}>
        <UserAvatarHeader />
        <View style={commonStyles.baseSubScreen}>
          <ConfirmPhoneNumberForm />
        </View>
      </ScrollView>
    </KeyboardAvoider>
  );
});

const styles = StyleSheet.create({
  containerContent: {
    flexGrow: 1,
  },
});
