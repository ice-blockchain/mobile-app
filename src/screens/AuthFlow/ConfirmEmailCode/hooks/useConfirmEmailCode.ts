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
import {failedReasonSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {
  emailVerificationCodeSelector,
  migrationEmailCodeSelector,
  migrationEmailSelector,
  temporaryEmailSelector,
} from '@store/modules/Validation/selectors';
import {useCallback, useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const useConfirmEmailCode = () => {
  const route = useRoute<RouteProp<AuthStackParamList, 'MigrationEmailCode'>>();
  const {isPhoneMigrationFlow} = route.params;

  const [email, setEmail] = useState<string | null | undefined>('');
  const [code, setCode] = useState<string | null | undefined>('');

  const dispatch = useDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const temporaryEmail = useSelector(temporaryEmailSelector, () => true);
  const temporaryCode = useSelector(emailVerificationCodeSelector, () => true);
  const migrationEmail = useSelector(migrationEmailSelector, () => true);
  const migrationCode = useSelector(migrationEmailCodeSelector, () => true);

  const validateError = useSelector(
    failedReasonSelector.bind(null, AccountActions.SIGN_IN_EMAIL_CODE),
  );

  const goBack = () => {
    dispatch(AccountActions.SIGN_IN_EMAIL_CODE.RESET.create());
  };

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          dispatch(AccountActions.SIGN_IN_EMAIL_CODE.RESET.create());
          return true;
        },
      );
      return () => subscription.remove();
    }, [dispatch]),
  );

  useEffect(() => {
    if (isPhoneMigrationFlow) {
      setEmail(migrationEmail);
      setCode(migrationCode);
    } else {
      setEmail(temporaryEmail);
      setCode(temporaryCode);
    }
  }, [
    temporaryEmail,
    temporaryCode,
    migrationEmail,
    migrationCode,
    isPhoneMigrationFlow,
  ]);

  useEffect(() => {
    console.log('isMigrationFlow: ', isPhoneMigrationFlow);
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
  };
};
