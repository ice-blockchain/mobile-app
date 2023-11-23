// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {
  emotionsAuthStatusSelector,
  lastEmotionSelector,
} from '@store/modules/FaceRecognition/selectors';
import {isEmotionsAuthFinalised} from '@store/modules/FaceRecognition/utils';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  onGatherMoreEmotions: () => void;
};

export function WaitForEmotion({onGatherMoreEmotions}: Props) {
  const emotionsAuthStatus = useSelector(emotionsAuthStatusSelector);
  useEffect(() => {
    if (isEmotionsAuthFinalised(emotionsAuthStatus)) {
      onGatherMoreEmotions();
    }
  }, [emotionsAuthStatus, onGatherMoreEmotions]);
  const lastEmotion = useSelector(lastEmotionSelector);
  return (
    <View style={commonStyles.flexOne}>
      <Header
        color={COLORS.primaryDark}
        title={t('face_auth.header')}
        backgroundColor={'transparent'}
      />
      {lastEmotion ? (
        <Image
          resizeMode={'contain'}
          source={{uri: lastEmotion}}
          style={styles.picture}
        />
      ) : (
        <Text style={styles.pleaseWait}>
          Please wait for the emotion picture...
        </Text>
      )}
      <View style={styles.statusButtonContainer}>
        <Touchable onPress={onGatherMoreEmotions} style={[styles.statusButton]}>
          <Text style={styles.statusText}>To Next Emotion</Text>
        </Touchable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  picture: {
    ...StyleSheet.absoluteFillObject,
    transform: [{scaleX: -1}],
  },
  pleaseWait: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  statusButtonContainer: {
    position: 'absolute',
    bottom: rem(40),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  statusButton: {
    height: rem(40),
    width: rem(240),
    borderRadius: rem(12),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  statusText: {
    marginStart: rem(8),
    ...font(14, 20, 'black', 'white', 'center'),
  },
});
