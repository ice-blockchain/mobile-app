// SPDX-License-Identifier: ice License 1.0

import {ConfirmEmailCodeForm} from '@components/Forms/ConfirmEmailCodeForm';
import {ConfirmEmailLinkForm} from '@components/Forms/ConfirmEmailLinkForm';
import {UserAvatarHeader} from '@components/UserAvatarHeader';
import {COLORS} from '@constants/colors';
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
import React, {memo, useEffect, useRef} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

export const ConfirmEmail = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const {scrollRef} = useScrollEndOnKeyboardShown();
  const tabbarOffset = useBottomTabBarOffsetStyle();

  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();

  const emailVerificationStep = useSelector(emailVerificationStepSelector);
  const flow = useRef(emailVerificationStep);

  useEffect(() => {
    if (emailVerificationStep === 'email') {
      navigation.goBack();
    }
  }, [navigation, emailVerificationStep]);

  return (
    <>
      <Header title={t('personal_information.title')} />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[styles.containerContent]}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}>
        <UserAvatarHeader />
        <View style={[commonStyles.baseSubScreen, tabbarOffset.current]}>
          {flow.current === 'link' ? (
            <ConfirmEmailLinkForm />
          ) : (
            <ConfirmEmailCodeForm />
          )}
        </View>
      </ScrollView>
    </>
  );
});

const styles = StyleSheet.create({
  containerContent: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
});
