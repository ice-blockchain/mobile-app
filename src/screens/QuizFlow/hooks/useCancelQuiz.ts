// SPDX-License-Identifier: ice License 1.0

import {QUIZ_KYC_STEP} from '@api/tokenomics/constants';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {QuizActions} from '@store/modules/Quiz/actions';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {t} from '@translations/i18n';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

export const useCancelQuiz = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const dispatch = useDispatch();

  const cancelQuiz = useCallback(() => {
    navigation.navigate('PopUp', {
      title: t('quiz.confirmation_popup.title'),
      message: t('quiz.confirmation_popup.cancel_description'),
      buttons: [
        {
          text: t('button.no'),
          preset: 'outlined',
        },
        {
          text: t('button.confirm'),
          onPress: () => {
            dispatch(
              TokenomicsActions.START_MINING_SESSION.START.create({
                skipKYCStep: QUIZ_KYC_STEP,
              }),
            );
            dispatch(QuizActions.RESET_QUIZ.RESET.create());
            navigation.goBack();
          },
        },
      ],
    });
  }, [dispatch, navigation]);

  return {
    cancelQuiz,
  };
};
