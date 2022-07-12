// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {SignUpStackParamList} from '@navigation/Auth';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NavigationPanel} from '@screens/AuthFlow/Welcome/components/NavigationPanel';
import {ValidationActions} from '@store/modules/Validation/actions';
import {isUsernameValidSelector} from '@store/modules/Validation/selectors';
import {translate} from '@translations/i18n';
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

const nicknameRegularExp = /^[A-Za-z0-9]+([A-Za-z0-9]*|[._-]?[A-Za-z0-9]+)*$/;

type Props = {
  navigation: NativeStackNavigationProp<SignUpStackParamList, 'SignIn'>;
};

export const ClaimNickname = ({navigation}: Props) => {
  const pagerViewRef = useRef<PagerView>(null);
  const [myNickname, setMyNickname] = useState('');
  const [invitedNickname, setInvitedNickname] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const isUsernameValid = useSelector(isUsernameValidSelector);
  const dispatch = useDispatch();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (isUsernameValid) {
      pagerViewRef.current?.setPage(1);
      setCurrentPage(1);
    }
  }, [isUsernameValid]);

  const onNextPress = async () => {
    if (currentPage === 0) {
      if (myNickname.trim().length > 20 || myNickname.trim().length < 4) {
        setError(translate('errors.nicknameSize'));
        return;
      } else {
        //TODO:
        await dispatch(
          ValidationActions.USERNAME_VALIDATION.START.create(myNickname),
        );
      }
    } else {
      if (!nicknameRegularExp.test(myNickname)) {
        setError(translate('errors.removeInvalidCharacters'));
        return;
      }
    }
  };

  const onMyNicknameChange = (v: string) => {
    if (error) {
      setError(undefined);
    }
    setMyNickname(v);
  };

  const onComplete = () => {
    navigation.navigate('Welcome');
  };
  const isNextButtonActive =
    (currentPage === 0 && myNickname.length > 0) ||
    (currentPage === 1 && invitedNickname.length > 0);

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
    paddingBottom: 12,
  },
});
