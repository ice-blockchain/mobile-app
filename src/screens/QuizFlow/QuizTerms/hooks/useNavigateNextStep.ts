// SPDX-License-Identifier: ice License 1.0

import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {quizTermsAcceptedSelector} from '@store/modules/Account/selectors';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

export const useNavigateNextStep = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const quizTermsAccepted = useSelector(quizTermsAcceptedSelector);

  useEffect(() => {
    if (quizTermsAccepted) {
      navigation.replace('QuizTheme');
    }
  }, [quizTermsAccepted, navigation]);
};
