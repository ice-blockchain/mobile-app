// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {POPUP_SIDE_OFFSET} from '@constants/styles';
import {useNavigation} from '@react-navigation/native';
import {CloseButton} from '@screens/Modals/PingFriendsPopUp/components/CloseButton';
import {FriendsList} from '@screens/Modals/PingFriendsPopUp/components/FriendsList';
import {Title} from '@screens/Modals/PingFriendsPopUp/components/Title';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {pingCounterSelector} from '@store/modules/Referrals/selectors';
import {processStatusForActionSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {RootState} from '@store/rootReducer';
import {t} from '@translations/i18n';
import React, {useCallback, useEffect} from 'react';
import {
  BackHandler,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const PingFriendsPopUp = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const count = useSelector(pingCounterSelector);

  const isPingingCanceled = useSelector(
    (state: RootState) =>
      processStatusForActionSelector(state, ReferralsActions.PING_FRIENDS)
        ?.status === 'RESET',
  );

  const cancelPinging = useCallback(() => {
    dispatch(ReferralsActions.PING_FRIENDS.RESET.create());
  }, [dispatch]);

  useEffect(() => {
    dispatch(ReferralsActions.PING_FRIENDS.START.create());
  }, [dispatch]);

  useEffect(() => {
    if (isPingingCanceled) {
      navigation.goBack();
    }
  }, [isPingingCanceled, navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      /**
       * When true is returned the event will not be bubbled up
       * & no other back action will execute
       */
      () => {
        cancelPinging();
        return true;
      },
    );
    return () => backHandler.remove();
  }, [cancelPinging]);

  return (
    <TouchableWithoutFeedback onPress={cancelPinging}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Title text={t('ping_friends_pop_up.title', {count})} />
          <CloseButton style={styles.closeButton} onPress={cancelPinging} />
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
    top: rem(16),
    right: rem(16),
  },
});
