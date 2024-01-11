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
import {useCallback, useEffect} from 'react';
import {BackHandler} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const useConfirmEmailCode = () => {
  const route = useRoute<RouteProp<AuthStackParamList, 'MigrationEmailCode'>>();
  const {isPhoneMigrationFlow} = route.params;

  const dispatch = useDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const temporaryEmail = useSelector(temporaryEmailSelector);
  const temporaryCode = useSelector(emailVerificationCodeSelector);
  const migrationEmail = useSelector(migrationEmailSelector);
  const migrationCode = useSelector(migrationEmailCodeSelector);

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
    email: isPhoneMigrationFlow ? migrationEmail : temporaryEmail,
    code: isPhoneMigrationFlow ? migrationCode : temporaryCode,
    validateError,
    goBack,
  };
};
