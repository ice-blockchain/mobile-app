// SPDX-License-Identifier: ice License 1.0

import {ModifyEmailForm} from '@components/Forms/ModifyEmailForm';
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
import {emailVerificationStepSelector} from '@store/modules/Validation/selectors';
import {t} from '@translations/i18n';
import React, {memo, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const ModifyEmail = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const {scrollRef} = useScrollEndOnKeyboardShown();
  const tabbarOffset = useBottomTabBarOffsetStyle();

  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();

  const emailVerificationStep = useSelector(emailVerificationStepSelector);

  useEffect(() => {
    if (emailVerificationStep === 'link' || emailVerificationStep === 'code') {
      navigation.navigate('ConfirmEmail');
    }
  }, [navigation, emailVerificationStep]);

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
          <ModifyEmailForm />
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
