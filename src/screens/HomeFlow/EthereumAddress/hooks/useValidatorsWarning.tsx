// SPDX-License-Identifier: ice License 1.0

import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AccountActions} from '@store/modules/Account/actions';
import {ethereumWarningConfirmedSelector} from '@store/modules/Account/selectors';
import {t} from '@translations/i18n';
import {useDispatch, useSelector} from 'react-redux';

export const useValidatorsWarning = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();
  const dispatch = useDispatch();
  const warningConfirmed = useSelector(ethereumWarningConfirmedSelector);

  const showWarning = () => {
    navigation.navigate('PopUp', {
      title: t('ethereum_address.validators_warning_title'),
      message: t('ethereum_address.validators_warning_text'),
      buttons: [
        {
          text: t('button.not_sure'),
          preset: 'outlined',
        },
        {
          text: t('button.confirm'),
          onPress: () => {
            dispatch(
              AccountActions.SET_ETHEREUM_ADDR_WARNING_CONFIRMED.STATE.create(),
            );
          },
        },
      ],
    });
  };

  return {showWarning, warningConfirmed};
};
