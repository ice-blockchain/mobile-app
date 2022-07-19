// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {SignUpStackParamList} from '@navigation/Auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NavigationPanel} from '@screens/UserRegistrationFlow/Welcome/components/NavigationPanel';
import {profileSelector} from '@store/modules/Auth/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {
  refUsernameValidationErrorSelector,
  usernameSelector,
  usernameValidationErrorSelector,
} from '@store/modules/Validation/selectors';
import {t} from '@translations/i18n';
import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {isIOS} from 'rn-units';

import {ClaimNickName} from './components/ClaimNickname';
import {WhoInvitedYou} from './components/WhoInvitedYou';

type Props = {
  navigation: NativeStackNavigationProp<SignUpStackParamList, 'SignIn'>;
};

export const UserRegistration = ({}: Props) => {
  const pagerViewRef = useRef<PagerView>(null);
  const [myNickname, setMyNickname] = useState('');
  const [invitedNickname, setInvitedNickname] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const profile = useSelector(profileSelector);
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<SignUpStackParamList>>();
  const [claimError, setClaimError] = useState<string>('');
  const [refError, setRefError] = useState<string>('');
  const username = useSelector(usernameSelector);
  const claimValidationError = useSelector(usernameValidationErrorSelector);
  const refValidationError = useSelector(refUsernameValidationErrorSelector);

  useEffect(() => {
    if (claimValidationError) {
      setClaimError(claimValidationError);
    }
  }, [claimValidationError]);

  useEffect(() => {
    if (refValidationError) {
      setRefError(refValidationError);
    }
  }, [refValidationError]);

  const wipeErrors = () => {
    if (claimValidationError || refValidationError) {
      dispatch(ValidationActions.RESET_VALIDATION_ERRORS.STATE.create());
    }
    if (claimError) {
      setClaimError('');
    }
    if (refError) {
      setRefError('');
    }
  };

  useEffect(() => {
    if (username) {
      pagerViewRef.current?.setPage(1);
      setCurrentPage(1);
    }
  }, [username]);

  useEffect(() => {
    if (profile) {
      navigation.navigate('Welcome');
    }
  }, [profile, navigation]);

  const onNextPress = () => {
    if (currentPage === 0) {
      dispatch(ValidationActions.USERNAME_VALIDATION.START.create(myNickname));
    }
  };

  const skipRefInvitation = () => {
    dispatch(
      ValidationActions.REF_USERNAME_VALIDATION.START.create(
        invitedNickname,
        true,
      ),
    );
  };

  const onMyNicknameChange = (v: string) => {
    wipeErrors();
    setMyNickname(v);
  };

  const onComplete = () => {
    dispatch(
      ValidationActions.REF_USERNAME_VALIDATION.START.create(
        invitedNickname,
        false,
      ),
    );
  };

  const isNextButtonActive =
    (currentPage === 0 && myNickname.trim().length > 0) ||
    (currentPage === 1 && invitedNickname.trim().length > 0);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={isIOS ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <PagerView
            ref={pagerViewRef}
            style={styles.container}
            initialPage={0}
            scrollEnabled={false}>
            <View key={'claimNickname'} style={styles.container}>
              <ScrollView>
                <ClaimNickName
                  inputValue={myNickname}
                  onInputChange={onMyNicknameChange}
                  errorText={claimError}
                  onFocus={wipeErrors}
                />
              </ScrollView>
            </View>
            <View key={'whoInvitedYou'} style={styles.container}>
              <ScrollView>
                <WhoInvitedYou
                  inputValue={invitedNickname}
                  onInputChange={setInvitedNickname}
                  onSkip={skipRefInvitation}
                  errorText={refError}
                  onFocus={wipeErrors}
                />
              </ScrollView>
            </View>
          </PagerView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <NavigationPanel
        amount={2}
        activeIndex={currentPage}
        nextPress={onNextPress}
        lastPageButtonText={t('button.complete')}
        yesPleasePress={onComplete}
        withError={!!claimError || !!refError}
        isButtonActive={isNextButtonActive}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 12,
  },
});
