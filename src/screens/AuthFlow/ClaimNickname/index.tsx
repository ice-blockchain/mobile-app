// SPDX-License-Identifier: BUSL-1.1

import React, {useRef, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';

import {COLORS} from '@constants/colors';
import WhoInvitedYou from './components/WhoInvitedYou';
import ClaimNickname from './components/ClaimNickname';
import NavigationPanel from '../Welcome/components/NavigationPanel';
// import {useDispatch} from 'react-redux';
// import UsersActions from '@store/modules/Users/actions';

const regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;

const SignUp = () => {
  const pagerViewRef = useRef<PagerView>(null);
  const [myNickname, setMyNickname] = useState('');
  const [invitedNickname, setInvitedNickname] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  // const dispatch = useDispatch();

  const [error, setError] = useState('');
  const onNextPress = async () => {
    if (myNickname.trim().length > 20 || myNickname.trim().length < 4) {
      setError('Nickname size: 4-20 characters.');
      return;
    }

    if (regex.test(myNickname)) {
      setError('Remove invalid characters.');
      return;
    }

    // if (regex.test(myNickname)) {
    //   setError('Nickname already taken.');
    //   return;
    // }

    // await dispatch(UsersActions.USERNAME_VALIDATION.START.create(myNickname));

    pagerViewRef.current?.setPage(1);
    setCurrentPage(1);
  };

  const onComplete = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

      <PagerView
        ref={pagerViewRef}
        style={styles.container}
        initialPage={0}
        scrollEnabled={false}>
        <View key={'claimNickname'} style={styles.container}>
          <ClaimNickname
            inputValue={myNickname}
            onInputChange={setMyNickname}
            errorText={error}
          />
        </View>
        <View key={'whoInvitedYou'} style={styles.container}>
          <WhoInvitedYou
            inputValue={invitedNickname}
            onInputChange={setInvitedNickname}
          />
        </View>
      </PagerView>

      <NavigationPanel
        amount={2}
        activeIndex={currentPage}
        nextPress={onNextPress}
        lastPageButtonText={'Complete'}
        yesPleasePress={onComplete}
        withError={true}
        isButtonActive={true}
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
