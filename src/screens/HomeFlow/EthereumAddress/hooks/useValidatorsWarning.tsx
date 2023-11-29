// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AccountActions} from '@store/modules/Account/actions';
import {
  ethereumWarningConfirmedSelector,
  unsafeUserSelector,
} from '@store/modules/Account/selectors';
import {t} from '@translations/i18n';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {call} from 'redux-saga/effects';

export const useValidatorsWarning = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();
  const dispatch = useDispatch();
  const user = useSelector(unsafeUserSelector);

  const ethereumWarningConfirmed = useSelector(
    ethereumWarningConfirmedSelector,
  );

  const [warningConfirmed, setWarningConfirmed] = useState(
    ethereumWarningConfirmed,
  );

  const setEthereumWarningConfirmed = (currentUser: User) => {
    dispatch(
      AccountActions.UPDATE_ACCOUNT.START.create(
        {
          clientData: {
            ...currentUser?.clientData,
            ethereumAddressWarningConfirmed: true,
          },
        },
        function* (freshUser) {
          if (!freshUser.clientData?.ethereumAddressWarningConfirmed) {
            yield call(setEthereumWarningConfirmed, freshUser);
          }
          return {retry: false};
        },
      ),
    );
  };

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
            setEthereumWarningConfirmed(user);
            setWarningConfirmed(true);
          },
        },
      ],
    });
  };

  return {showWarning, warningConfirmed};
};
