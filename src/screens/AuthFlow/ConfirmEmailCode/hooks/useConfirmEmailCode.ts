// SPDX-License-Identifier: ice License 1.0

import {AuthStackParamList} from '@navigation/Auth';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AccountActions} from '@store/modules/Account/actions';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {failedReasonSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {
  emailVerificationCodeSelector,
  migrationEmailCodeSelector,
  migrationEmailSelector,
  temporaryEmailSelector,
} from '@store/modules/Validation/selectors';
import {useCallback, useEffect} from 'react';
import {BackHandler} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const useConfirmEmailCode = () => {
  const route = useRoute<RouteProp<AuthStackParamList, 'ConfirmEmailCode'>>();
  const isPhoneMigrationFlow = route.params?.isPhoneMigrationFlow;

  const dispatch = useDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const email = useSelector(
    isPhoneMigrationFlow ? migrationEmailSelector : temporaryEmailSelector,
    () => true,
  );

  const code = useSelector(
    isPhoneMigrationFlow
      ? migrationEmailCodeSelector
      : emailVerificationCodeSelector,
  );

  const validateError = useSelector(
    failedReasonSelector.bind(null, AccountActions.SIGN_IN_EMAIL_CODE),
  );

  const goBack = () => {
    if (isPhoneMigrationFlow) {
      onEditEmail();
    } else {
      dispatch(AccountActions.SIGN_IN_EMAIL_CODE.RESET.create());
    }
  };

  const onEditEmail = () => {
    if (isPhoneMigrationFlow) {
      dispatch(
        FaceRecognitionActions.RESET_EMOTIONS_AUTH_STATUS.STATE.create(),
      );
      dispatch(AccountActions.MIGRATE_PHONE_NUMBER_TO_EMAIL.RESET.create());
      navigation.reset({
        index: 0,
        routes: [{name: 'SignIn' as keyof AuthStackParamList}],
      });
    } else {
      dispatch(AccountActions.SIGN_IN_EMAIL_CODE.RESET.create());
    }
  };

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          if (isPhoneMigrationFlow) {
            navigation.goBack();
          } else {
            dispatch(AccountActions.SIGN_IN_EMAIL_CODE.RESET.create());
          }
          return true;
        },
      );
      return () => subscription.remove();
    }, [dispatch, navigation, isPhoneMigrationFlow]),
  );

  useEffect(() => {
    if (isPhoneMigrationFlow) {
      dispatch(AccountActions.MIGRATE_EMAIL_WITH_CODE.START.create());
    }
  }, [dispatch, isPhoneMigrationFlow]);

  useEffect(() => {
    if (validateError) {
      navigation.goBack();
    }
  }, [validateError, navigation, isPhoneMigrationFlow]);

  return {
    email,
    code,
    validateError,
    goBack,
    onEditEmail,
  };
};
