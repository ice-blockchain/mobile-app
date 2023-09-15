// SPDX-License-Identifier: ice License 1.0

import {CheckMark} from '@components/CheckMark';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useNavigation} from '@react-navigation/native';
import {StatusOverlay} from '@screens/FaceRecognitionFlow/components/StatusOverlay';
import {
  emotionsAuthFramesSelector,
  emotionsAuthStatusSelector,
} from '@store/modules/FaceRecognition/selectors';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {LogoIcon} from '@svg/LogoIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

export function EmotionsSentStep() {
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

  const emotionsAuthFrames = useSelector(emotionsAuthFramesSelector);

  return (
    <View style={commonStyles.flexOne}>
      {emotionsAuthFrames?.length ? (
        <Image
          resizeMode={'contain'}
          source={{uri: emotionsAuthFrames[Math.floor(Math.random() * 15)]}}
          style={styles.picture}
        />
      ) : null}
      {emotionsAuthStatus === 'LOADING' ? (
        <StatusOverlay
          onLightBackground
          description={t('face_auth.auth_status.loading.description')}
          titleIcon={
            <LogoIcon color={COLORS.white} width={rem(70)} height={rem(70)} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  picture: {
    width: '100%',
    height: '100%',
    transform: [{scaleX: -1}],
    position: 'absolute',
  },
  checkmarkStyle: {
    backgroundColor: COLORS.white,
  },
});
