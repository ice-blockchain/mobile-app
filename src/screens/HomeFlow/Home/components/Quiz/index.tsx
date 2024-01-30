// SPDX-License-Identifier: ice License 1.0

import {ActionListItem} from '@components/ListItems/ActionListItem';
import {COLORS} from '@constants/colors';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Images} from '@images';
import {QuizActions} from '@store/modules/Quiz/actions';
import {ChevronSmallIcon} from '@svg/ChevronSmallIcon';
import {ClockIcon} from '@svg/ClockIcon';
import {RestartIcon} from '@svg/RestartIcon';
import {isRTL, t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {rem} from 'rn-units';

export const Quiz = memo(() => {
  const dispatch = useDispatch();
  const onPress = () => {
    dispatch(QuizActions.START_OR_CONTINUE_QUIZ_FLOW.STATE.create());
  };

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
          <RestartIcon
            color={COLORS.secondary}
            width={rem(14)}
            height={rem(14)}
            style={styles.retriesIcon}
          />
          <Text style={[styles.subtitleText, styles.retriesText]}>
            {t('quiz.retries', {number: 2})}
          </Text>
          <ClockIcon
            color={COLORS.secondary}
            width={rem(11)}
            height={rem(11)}
            style={styles.timeLeftIcon}
          />
          <Text style={styles.subtitleText}>
            {t('quiz.days_left', {days: 5})}
          </Text>
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
  },
  leadingIconContainer: {
    width: rem(60),
    backgroundColor: COLORS.transparent,
  },
  icon: {
    width: rem(72),
    height: rem(69),
    position: 'absolute',
    bottom: -rem(6),
    left: -rem(8),
  },
  subtitle: {
    marginTop: rem(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  retriesIcon: {
    marginTop: rem(2),
    marginRight: rem(3),
  },
  retriesText: {
    marginRight: rem(14),
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
