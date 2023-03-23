// SPDX-License-Identifier: ice License 1.0

import {ModifyPhoneNumberForm} from '@components/Forms/ModifyPhoneNumberForm';
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

export const ModifyPhoneNumber = memo(() => {
  useFocusStatusBar({style: 'dark-content'});
  const {scrollRef} = useScrollEndOnKeyboardShown();
  const tabbarOffset = useBottomTabBarOffsetStyle();

  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();

  const phoneVerificationStep = useSelector(phoneVerificationStepSelector);

  useEffect(() => {
    if (phoneVerificationStep === 'code') {
      navigation.navigate('ConfirmPhoneNumber');
    }
  }, [navigation, phoneVerificationStep]);

  return (
    <KeyboardAvoider
      keyboardVerticalOffset={rem(20) - tabbarOffset.current.paddingBottom}>
      <Header title={t('personal_information.title')} />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[styles.containerContent, tabbarOffset.current]}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}>
        <UserAvatarHeader />
        <View style={commonStyles.baseSubScreen}>
          <ModifyPhoneNumberForm />
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
