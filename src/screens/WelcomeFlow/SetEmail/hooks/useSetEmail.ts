// SPDX-License-Identifier: ice License 1.0

import {DEFAULT_DIALOG_NO_BUTTON} from '@components/Buttons/PopUpButton';
import {AuthStackParamList} from '@navigation/Auth';
import {WelcomeStackParamList} from '@navigation/Welcome';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AccountActions} from '@store/modules/Account/actions';
import {isOnboardingViewedSelector} from '@store/modules/Users/selectors';
import {
  failedReasonSelector,
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {migrationUserIdSelector} from '@store/modules/Validation/selectors';
import {t} from '@translations/i18n';
import {useCallback, useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const useSetEmail = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<WelcomeStackParamList>>();

  const authNavigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const migrationUserId = useSelector(migrationUserIdSelector);

  const isViewedAgreement = useSelector(
    isOnboardingViewedSelector(migrationUserId),
  );

  const updateError = useSelector(
    failedReasonSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const updateLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const migrationError = useSelector(
    failedReasonSelector.bind(
      null,
      AccountActions.MIGRATE_PHONE_NUMBER_TO_EMAIL,
    ),
  );

  const migrationLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.MIGRATE_PHONE_NUMBER_TO_EMAIL),
  );

  const isSuccessMigration = useSelector(
    isSuccessSelector.bind(null, AccountActions.MIGRATE_PHONE_NUMBER_TO_EMAIL),
  );

  const [email, setEmail] = useState('');

  const onChangeEmail = (text: string) => {
    setEmail(text);
  };

  useEffect(() => {
    if (isSuccessMigration) {
      if (isViewedAgreement) {
        authNavigation.replace('AccountConfirmation');
      } else {
        //TODO: show emotions
      }
    }
  }, [isSuccessMigration, isViewedAgreement, authNavigation]);

  const onBack = () => {
    if (migrationUserId) {
      dispatch(AccountActions.SIGN_IN_PHONE.RESET.create());
    }
    navigation.goBack();
  };

  const sendVerificationEmail = useCallback(() => {
    Keyboard.dismiss();
    if (migrationUserId) {
      dispatch(
        AccountActions.MIGRATE_PHONE_NUMBER_TO_EMAIL.START.create(email),
      );
    } else {
      dispatch(ValidationActions.EMAIL_VALIDATION.RESET.create());
      dispatch(AccountActions.MODIFY_EMAIL_WITH_LINK.START.create(email));
    }
  }, [dispatch, email, migrationUserId]);

  const onSubmitPress = useCallback(() => {
    if (migrationUserId) {
      sendVerificationEmail();
    } else {
      navigation.navigate({
        name: 'PopUp',
        key: 'confirm-email-popup',
        params: {
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
        },
      });
    }
  }, [navigation, sendVerificationEmail, migrationUserId]);

  return {
    email,
    onChangeEmail,
    updateError,
    migrationError,
    updateLoading,
    migrationLoading,
    onSubmitPress,
    onBack,
  };
};
