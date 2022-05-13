// SPDX-License-Identifier: BUSL-1.1

import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import {isIOS} from 'rn-units';

import {COLORS} from '@constants/colors';
import {translate} from '@utils/i18n';

import WhoInvitedYou from './components/WhoInvitedYou';
import ClaimNickname from './components/ClaimNickname';
import NavigationPanel from '../Welcome/components/NavigationPanel';
import {useDispatch} from 'react-redux';
import AuthActions from '@store/modules/Auth/actions';
import {useNavigation} from '@react-navigation/native';

const nicknameRegularExp = /^[A-Za-z0-9]+([A-Za-z0-9]*|[._-]?[A-Za-z0-9]+)*$/;

const SignUp = () => {
  const pagerViewRef = useRef<PagerView>(null);
  const navigation = useNavigation();
  const [myNickname, setMyNickname] = useState('');
  const [invitedNickname, setInvitedNickname] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();

  const [error, setError] = useState<string>();
  const onNextPress = () => {
    console.log('lba myNickname', myNickname);

    if (myNickname.trim().length > 20 || myNickname.trim().length < 4) {
      setError(translate('errors.nicknameSize'));
      return;
    }

    if (!nicknameRegularExp.test(myNickname)) {
      setError(translate('errors.removeInvalidCharacters'));
      return;
    }

    // await dispatch(UsersActions.USERNAME_VALIDATION.START.create(myNickname));

    pagerViewRef.current?.setPage(1);
    setCurrentPage(1);
  };

  const onMyNicknameChange = (v: string) => {
    if (error) {
      setError(undefined);
    }
    setMyNickname(v);
  };

  const onComplete = () => {
    dispatch(AuthActions.STORE_CLAIM_NICKNAME_DONE.STATE.create());
    navigation.navigate('Welcome');
  };
  const isNextButtonActive =
    (currentPage === 0 && myNickname.length > 0) ||
    (currentPage === 1 && invitedNickname.length > 0);

  return (
    <SafeAreaView style={styles.container}>
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
                <ClaimNickname
                  inputValue={myNickname}
                  onInputChange={onMyNicknameChange}
                  errorText={error}
                />
              </ScrollView>
            </View>
            <View key={'whoInvitedYou'} style={styles.container}>
              <ScrollView>
                <WhoInvitedYou
                  inputValue={invitedNickname}
                  onInputChange={setInvitedNickname}
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
        lastPageButtonText={'Complete'}
        yesPleasePress={onComplete}
        withError={!!error}
        isButtonActive={isNextButtonActive}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SignUp;
