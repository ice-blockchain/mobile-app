// SPDX-License-Identifier: ice License 1.0

import {CheckMark} from '@components/CheckMark';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useNavigation} from '@react-navigation/native';
import {StatusOverlay} from '@screens/FaceRecognitionFlow/components/StatusOverlay';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {emotionsAuthStatusSelector} from '@store/modules/FaceRecognition/selectors';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {LogoIcon} from '@svg/LogoIcon';
import {RestartIcon} from '@svg/RestartIcon';
import {t} from '@translations/i18n';
import React, {useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  onGatherMoreEmotions: () => void;
};

export function EmotionsSentStep({onGatherMoreEmotions}: Props) {
  const emotionsAuthStatus = useSelector(emotionsAuthStatusSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onFaceAuthSuccess = () => {
    dispatch(TokenomicsActions.START_MINING_SESSION.START.create());
    navigation.goBack();
  };
  const onFaceAuthBanned = () => {
    navigation.goBack();
  };
  const onFaceAuthTryLater = () => {
    navigation.goBack();
  };
  const onTryAgain = useCallback(() => {
    dispatch(FaceRecognitionActions.RESET_EMOTIONS_AUTH_STATUS.STATE.create());
    onGatherMoreEmotions();
  }, [dispatch, onGatherMoreEmotions]);
  useEffect(() => {
    if (emotionsAuthStatus === 'SESSION_EXPIRED') {
      onTryAgain();
    }
  }, [emotionsAuthStatus, onTryAgain]);
  useEffect(() => {
    if (emotionsAuthStatus === 'NEED_MORE_EMOTIONS') {
      onGatherMoreEmotions();
    }
  }, [emotionsAuthStatus, onGatherMoreEmotions]);
  return (
    <View style={commonStyles.flexOne}>
      {emotionsAuthStatus === 'LOADING' ? (
        <StatusOverlay
          onLightBackground
          description={t('face_auth.auth_status.loading.description')}
          titleIcon={
            <LogoIcon color={COLORS.primary} width={rem(70)} height={rem(70)} />
          }
        />
      ) : null}
      {emotionsAuthStatus === 'SUCCESS' ? (
        <StatusOverlay
          onLightBackground
          description={t('face_auth.auth_status.success.description')}
          title={t('face_auth.auth_status.success.title')}
          actionText={t('face_auth.auth_status.success.action')}
          actionColor={COLORS.shamrock}
          actionIcon={
            <CheckMark fill={COLORS.shamrock} style={styles.checkmarkStyle} />
          }
          action={onFaceAuthSuccess}
        />
      ) : null}
      {emotionsAuthStatus === 'TRY_LATER' ? (
        <StatusOverlay
          onLightBackground
          description={t('face_auth.auth_status.try_later.description')}
          title={t('face_auth.auth_status.try_later.title')}
          actionText={t('face_auth.auth_status.try_later.action')}
          actionColor={COLORS.attention}
          action={onFaceAuthTryLater}
        />
      ) : null}
      {emotionsAuthStatus === 'BANNED' ? (
        <StatusOverlay
          onLightBackground
          description={t('face_auth.auth_status.banned.description')}
          title={t('face_auth.auth_status.banned.title')}
          actionText={t('face_auth.auth_status.banned.action')}
          actionColor={COLORS.attention}
          action={onFaceAuthBanned}
        />
      ) : null}
      {emotionsAuthStatus === 'FAILED' ? (
        <StatusOverlay
          onLightBackground
          description={t('face_auth.auth_status.failure.description')}
          title={t('face_auth.auth_status.failure.title')}
          actionText={t('face_auth.auth_status.failure.action')}
          actionColor={COLORS.attention}
          actionIcon={
            <RestartIcon
              color={COLORS.white}
              width={rem(24)}
              height={rem(24)}
            />
          }
          action={onTryAgain}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  checkmarkStyle: {
    backgroundColor: COLORS.white,
  },
});
