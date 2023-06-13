// SPDX-License-Identifier: ice License 1.0

import {WelcomeStackParamList} from '@navigation/Welcome';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DEFAULT_DIALOG_NO_BUTTON} from '@screens/Modals/PopUp/components/PopUpButton';
import {AccountActions} from '@store/modules/Account/actions';
import {
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {t} from '@translations/i18n';
import {useCallback, useState} from 'react';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const useSetEmail = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<WelcomeStackParamList>>();

  const updateError = useSelector(
    failedReasonSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );
  const updateLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const [email, setEmail] = useState('');

  const onChangeEmail = (text: string) => {
    setEmail(text);
  };

  const onBack = () => {
    navigation.goBack();
  };

  const sendVerificationEmail = useCallback(() => {
    Keyboard.dismiss();
    dispatch(ValidationActions.EMAIL_VALIDATION.RESET.create());
    dispatch(AccountActions.VERIFY_BEFORE_UPDATE_EMAIL.START.create(email));
  }, [dispatch, email]);

  const onSubmitPress = useCallback(() => {
    navigation.navigate('PopUp', {
      title: t('settings.confirm_email_confirmation_title'),
      message: t('settings.update_email_confirmation_subtitle'),
      buttons: [
        DEFAULT_DIALOG_NO_BUTTON,
        {
          text: t('button.continue'),
          onPress: () => {
            sendVerificationEmail();
          },
        },
      ],
    });
  }, [navigation, sendVerificationEmail]);

  return {
    email,
    onChangeEmail,
    updateError,
    updateLoading,
    onSubmitPress,
    onBack,
  };
};
