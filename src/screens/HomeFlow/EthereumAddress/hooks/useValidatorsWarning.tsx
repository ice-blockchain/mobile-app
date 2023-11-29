// SPDX-License-Identifier: ice License 1.0

import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {t} from '@translations/i18n';
import {useState} from 'react';

export const useValidatorsWarning = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  const [isWarningConfirmed, setIsWarningConfirmed] = useState(false);

  const showWarning = () => {
    navigation.navigate('PopUp', {
      title: t('ethereum_address.validators_warning_title'),
      message: t('ethereum_address.validators_warning_text'),
      buttons: [
        {
          text: t('button.not_sure'),
          preset: 'outlined',
          onPress: () => {
            navigation.goBack();
          },
        },
        {
          text: t('button.confirm'),
          onPress: () => {
            //TODO::persist flag
            setIsWarningConfirmed(true);
          },
        },
      ],
    });
  };

  return {showWarning, isWarningConfirmed};
};
