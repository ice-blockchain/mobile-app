// SPDX-License-Identifier: ice License 1.0

import {AuthEmotion} from '@api/faceRecognition/types';
import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {ClockIcon} from '@svg/ClockIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import {Duration} from 'dayjs/plugin/duration';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  emotion: AuthEmotion;
  countDownSecs: Duration;
  previewTimeInMs: number;
};

function getEmotionImage({
  emotion,
  showPreview,
}: {
  emotion: AuthEmotion;
  showPreview: boolean;
}) {
  switch (emotion) {
    case 'anger':
      return showPreview
        ? Images.emotions.anger_preview
        : Images.emotions.anger;
    case 'contempt':
      return showPreview
        ? Images.emotions.contempt_preview
        : Images.emotions.contempt;
    case 'disgust':
      return showPreview
        ? Images.emotions.disgust_preview
        : Images.emotions.disgust;
    case 'fear':
      return showPreview ? Images.emotions.fear_preview : Images.emotions.fear;
    case 'happiness':
      return showPreview
        ? Images.emotions.happiness_preview
        : Images.emotions.happiness;
    case 'neutral':
      return showPreview
        ? Images.emotions.neutral_preview
        : Images.emotions.neutral;
    case 'sadness':
      return showPreview
        ? Images.emotions.sadness_preview
        : Images.emotions.sadness;
    case 'surprise':
      return showPreview
        ? Images.emotions.surprise_preview
        : Images.emotions.surprise;
    default:
      return showPreview
        ? Images.emotions.neutral_preview
        : Images.emotions.neutral;
  }
}

function getEmotionTranslation(emotion: AuthEmotion) {
  switch (emotion) {
    case 'anger':
      return t('face_auth.emotions_recognition.emotions.anger');
    case 'contempt':
      return t('face_auth.emotions_recognition.emotions.contempt');
    case 'disgust':
      return t('face_auth.emotions_recognition.emotions.disgust');
    case 'fear':
      return t('face_auth.emotions_recognition.emotions.fear');
    case 'happiness':
      return t('face_auth.emotions_recognition.emotions.happiness');
    case 'neutral':
      return t('face_auth.emotions_recognition.emotions.neutral');
    case 'sadness':
      return t('face_auth.emotions_recognition.emotions.sadness');
    case 'surprise':
      return t('face_auth.emotions_recognition.emotions.surprise');
    default:
      return '';
  }
}

export function EmotionCard({emotion, countDownSecs, previewTimeInMs}: Props) {
  const [showPreview, setShowPreview] = useState(true);
  useEffect(() => {
    setShowPreview(true);
    setTimeout(() => setShowPreview(false), previewTimeInMs);
  }, [emotion, previewTimeInMs]);

  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer, styles.image]}>
        <Image
          fadeDuration={0}
          style={styles.image}
          resizeMode={'contain'}
          source={getEmotionImage({emotion, showPreview: true})}
        />
        {showPreview ? null : (
          <Image
            fadeDuration={0}
            style={[styles.image, StyleSheet.absoluteFill]}
            resizeMode={'contain'}
            source={getEmotionImage({emotion, showPreview: false})}
          />
        )}
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.countDownContainer}>
          <ClockIcon
            width={rem(16)}
            height={rem(16)}
            color={COLORS.secondaryPale}
          />
          <Text style={styles.countDownText}>
            {`${countDownSecs.seconds()}${t('general.seconds_short')}`}
          </Text>
        </View>
        <Text style={styles.emotionText}>{getEmotionTranslation(emotion)}</Text>
        <Text style={styles.descriptionText}>
          {t('face_auth.emotions_recognition.please_show_this')}
        </Text>
      </View>
    </View>
  );
}

const IMAGE_SIZE = rem(120);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: rem(16),
    width: '100%',
    borderRadius: rem(16),
    backgroundColor: COLORS.white,
    paddingVertical: rem(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: rem(20),
    marginHorizontal: rem(12),
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  countDownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dataContainer: {
    justifyContent: 'center',
    paddingRight: rem(12),
  },
  countDownText: {
    marginStart: rem(6),
    ...font(14, 18, 'medium', 'secondaryPale'),
  },
  emotionText: {
    ...font(24, 34, 'bold', 'codeFieldText'),
    textTransform: 'capitalize',
  },
  descriptionText: {
    ...font(13, 19, 'medium', 'primaryLight'),
  },
});
