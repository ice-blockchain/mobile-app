// SPDX-License-Identifier: BUSL-1.1

import React, {useRef, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';

import {COLORS} from '@constants/colors';
import WhoInvitedYou from './components/WhoInvitedYou';
import ClaimNickname from './components/ClaimNickname';
import NavigationPanel from '../Welcome/components/NavigationPanel';

const SignUp = () => {
  const pagerViewRef = useRef<PagerView>(null);
  const [myNickname, setMyNickname] = useState('');
  const [invitedNickname, setInvitedNickname] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const onNextPress = () => {
    pagerViewRef.current?.setPage(1);
    setCurrentPage(1);
  };

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
        yesPleasePress={() => {}}
        withError={false}
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
