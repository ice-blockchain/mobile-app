// SPDX-License-Identifier: ice License 1.0

import {ActionListItem} from '@components/ListItems/ActionListItem';
import {COLORS} from '@constants/colors';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Images} from '@images';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {quizStatusSelector} from '@store/modules/Quiz/selectors';
import {ChevronSmallIcon} from '@svg/ChevronSmallIcon';
import {ClockIcon} from '@svg/ClockIcon';
import {RestartIcon} from '@svg/RestartIcon';
import {isRTL, t} from '@translations/i18n';
import {daysFromNow} from '@utils/date';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const Quiz = memo(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const onPress = () => {
    navigation.navigate('QuizIntro');
  };

  const quizStatus = useSelector(quizStatusSelector);

  if (quizStatus === null) {
    return (
      <SkeletonPlaceholder borderRadius={rem(16)}>
        <View style={styles.container} />
      </SkeletonPlaceholder>
    );
  }

  if (
    !quizStatus.kycQuizAvailable ||
    quizStatus.kycQuizCompleted ||
    quizStatus.kycQuizDisabled
  ) {
    return null;
  }

  return (
    <ActionListItem
      onPress={onPress}
      LeadingIcon={
        <Image source={Images.quiz.quiz_small} style={styles.icon} />
      }
      leadingIconContainerStyle={styles.leadingIconContainer}
      title={t('quiz.action')}
      subtitle={
        <View style={styles.subtitle}>
          <View style={styles.subtitleRow}>
            <RestartIcon
              color={COLORS.secondary}
              width={rem(14)}
              height={rem(14)}
              style={styles.retriesIcon}
            />
            <Text style={styles.subtitleText}>
              {t('quiz.retries_left', {
                number: quizStatus.kycQuizRemainingAttempts ?? 0,
              })}
            </Text>
          </View>
          <View style={styles.subtitleRow}>
            <ClockIcon
              color={COLORS.secondary}
              width={rem(11)}
              height={rem(11)}
              style={styles.timeLeftIcon}
            />
            <Text style={styles.subtitleText}>
              {t('quiz.days_left', {
                days: daysFromNow(quizStatus.kycQuizAvailabilityEndedAt),
              })}
            </Text>
          </View>
        </View>
      }
      TrailingIcon={
        <ChevronSmallIcon style={styles.chevron} color={COLORS.primaryDark} />
      }
      containerStyle={[styles.container, commonStyles.shadow]}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(26),
    height: rem(76),
  },
  leadingIconContainer: {
    width: rem(64),
    backgroundColor: COLORS.transparent,
  },
  icon: {
    width: rem(77),
    height: rem(74),
    position: 'absolute',
    bottom: -rem(10),
    left: -rem(8),
  },
  subtitle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subtitleRow: {
    marginTop: rem(4),
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: rem(14),
  },
  retriesIcon: {
    marginTop: rem(2),
    marginRight: rem(1),
  },
  subtitleText: {
    ...font(12, 15, 'regular', 'secondary'),
  },
  timeLeftIcon: {
    marginRight: rem(4),
  },
  chevron: {
    transform: [{rotateZ: isRTL ? '90deg' : '-90deg'}],
  },
});
