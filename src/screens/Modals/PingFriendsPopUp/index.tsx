// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {POPUP_SIDE_OFFSET} from '@constants/styles';
import {useNavigation} from '@react-navigation/native';
import {CloseButton} from '@screens/Modals/PingFriendsPopUp/components/CloseButton';
import {FriendsList} from '@screens/Modals/PingFriendsPopUp/components/FriendsList';
import {Title} from '@screens/Modals/PingFriendsPopUp/components/Title';
import {pingCounterSelector} from '@store/modules/Referrals/selectors';
import {t} from '@translations/i18n';
import React, {useEffect} from 'react';
import {
  BackHandler,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const PingFriendsPopUp = () => {
  const navigation = useNavigation();

  const count = useSelector(pingCounterSelector);

  const onPressOutside = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      /**
       * When true is returned the event will not be bubbled up
       * & no other back action will execute
       */
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={onPressOutside}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Title text={t('ping_friends_pop_up.title', {count})} />
          <CloseButton style={styles.closeButton} />
          <FriendsList />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.transparentBackground,
  },
  container: {
    marginHorizontal: POPUP_SIDE_OFFSET,
    backgroundColor: COLORS.white,
    borderRadius: rem(20),
    paddingBottom: rem(20),
    paddingTop: rem(20),
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: rem(10),
    right: rem(10),
  },
});
