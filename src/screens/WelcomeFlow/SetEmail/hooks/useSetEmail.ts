// SPDX-License-Identifier: ice License 1.0

import {EMOTIONS_KYC_STEP} from '@api/tokenomics/constants';
import {DEFAULT_DIALOG_NO_BUTTON} from '@components/Buttons/PopUpButton';
import {AuthStackParamList} from '@navigation/Auth';
import {WelcomeStackParamList} from '@navigation/Welcome';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AccountActions} from '@store/modules/Account/actions';
import {isMigrationAgreementViewedSelector} from '@store/modules/Users/selectors';
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
    useNavigation<
      NativeStackNavigationProp<WelcomeStackParamList & AuthStackParamList>
    >();

  const migrationUserId = useSelector(migrationUserIdSelector);

  const isViewedAgreement = useSelector(
    isMigrationAgreementViewedSelector(migrationUserId),
  );

  const error = useSelector(
    failedReasonSelector.bind(
      null,
      migrationUserId
        ? AccountActions.MIGRATE_PHONE_NUMBER_TO_EMAIL
        : AccountActions.UPDATE_ACCOUNT,
    ),
  );

  const loading = useSelector(
    isLoadingSelector.bind(
      null,
      migrationUserId
        ? AccountActions.MIGRATE_PHONE_NUMBER_TO_EMAIL
        : AccountActions.UPDATE_ACCOUNT,
    ),
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
        navigation.navigate({
          name: 'FaceRecognition',
          params: {kycSteps: [EMOTIONS_KYC_STEP], isPhoneMigrationFlow: true},
        });
      } else {
        navigation.replace('AccountConfirmation');
      }
    }
  }, [isSuccessMigration, isViewedAgreement, navigation]);

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
    error,
    loading,
    onSubmitPress,
    onBack,
  };
};
