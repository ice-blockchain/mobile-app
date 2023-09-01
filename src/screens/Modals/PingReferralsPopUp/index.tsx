// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {POPUP_SIDE_OFFSET} from '@constants/styles';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {CloseButton} from '@screens/Modals/PingReferralsPopUp/components/CloseButton';
import {ReferralsList} from '@screens/Modals/PingReferralsPopUp/components/ReferralsList';
import {Title} from '@screens/Modals/PingReferralsPopUp/components/Title';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {pingCounterSelector} from '@store/modules/Referrals/selectors';
import {processStatusForActionSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {RootState} from '@store/rootReducer';
import {t} from '@translations/i18n';
import React, {useCallback, useEffect, useState} from 'react';
import {
  BackHandler,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const PingReferralsPopUp = () => {
  const navigation = useNavigation();

  const {
    params: {userId},
  } = useRoute<RouteProp<MainStackParamList, 'PingReferralsPopUp'>>();

  const [isPingInitiated, setPingInitiated] = useState(false);

  const dispatch = useDispatch();

  const count = useSelector(pingCounterSelector);

  const isPingingCanceled = useSelector(
    (state: RootState) =>
      processStatusForActionSelector(state, ReferralsActions.PING_REFERRALS)
        ?.status === 'RESET',
  );

  const cancelPinging = useCallback(() => {
    dispatch(ReferralsActions.PING_REFERRALS.RESET.create());
  }, [dispatch]);

  useEffect(() => {
    dispatch(ReferralsActions.PING_REFERRALS.START.create({userId}));
    setPingInitiated(true);
  }, [dispatch, userId]);

  useEffect(() => {
    if (isPingingCanceled && isPingInitiated) {
      navigation.goBack();
    }
  }, [isPingingCanceled, navigation, isPingInitiated]);

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
          <View style={styles.titleContainer}>
            <Title text={t('ping_referrals_pop_up.title', {count})} />
          </View>
          <CloseButton style={styles.closeButton} onPress={cancelPinging} />
          <ReferralsList />
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
  },
  titleContainer: {
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: rem(16),
    right: rem(16),
  },
});
