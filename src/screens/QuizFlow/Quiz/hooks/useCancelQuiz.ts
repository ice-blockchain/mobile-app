// SPDX-License-Identifier: ice License 1.0

import {QUIZ_KYC_STEP} from '@api/tokenomics/constants';
import {DEFAULT_DIALOG_NO_BUTTON} from '@components/Buttons/PopUpButton';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {t} from '@translations/i18n';
import {useDispatch} from 'react-redux';

export const useCancelQuiz = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const dispatch = useDispatch();

  const cancelQuiz = () => {
    navigation.navigate('PopUp', {
      title: t('quiz.confirmation_popup.title'),
      message: t('quiz.confirmation_popup.cancel_description'),
      buttons: [
        DEFAULT_DIALOG_NO_BUTTON,
        {
          text: t('button.confirm'),
          onPress: () => {
            dispatch(
              TokenomicsActions.START_MINING_SESSION.START.create({
                skipKYCStep: QUIZ_KYC_STEP,
              }),
            );
            navigation.goBack();
          },
        },
      ],
    });
  };

  return {
    cancelQuiz,
  };
};
