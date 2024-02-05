// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {QuizActions} from '@store/modules/Quiz/actions';
import {quizAttemptsLeftSelector} from '@store/modules/Quiz/selectors';
import {RestartIcon} from '@svg/RestartIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const useCancelQuiz = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const dispatch = useDispatch();
  const quizAttemptsLeft = useSelector(quizAttemptsLeftSelector);

  const cancelQuiz = useCallback(() => {
    navigation.navigate('PopUp', {
      title: t('quiz.confirmation_popup.title'),
      message: (
        <View style={styles.messageBody}>
          <Text style={styles.messageText}>
            {t('quiz.confirmation_popup.cancel_description')}
          </Text>
          <View style={styles.retries}>
            <RestartIcon
              color={COLORS.primaryLight}
              width={rem(14)}
              height={rem(14)}
              style={styles.retriesIcon}
            />
            <Text style={styles.retriesText}>
              {t('quiz.retries_left', {number: quizAttemptsLeft ?? 0})}
            </Text>
          </View>
        </View>
      ),
      buttons: [
        {
          text: t('button.back'),
          preset: 'outlined',
        },
        {
          text: t('button.skip'),
          onPress: () => {
            dispatch(QuizActions.RESET_QUIZ_KYC_STEP.START.create());
            navigation.goBack();
          },
        },
      ],
    });
  }, [dispatch, navigation, quizAttemptsLeft]);

  return {
    cancelQuiz,
  };
};

const styles = StyleSheet.create({
  messageBody: {
    marginTop: rem(12),
    marginHorizontal: rem(30),
    alignItems: 'center',
  },
  messageText: {
    ...font(14, 22, 'medium', 'secondary', 'center'),
  },
  retries: {
    marginTop: rem(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  retriesIcon: {
    marginTop: rem(2),
    marginRight: rem(1),
  },
  retriesText: {
    ...font(14, 17, 'regular', 'primaryLight'),
  },
});
