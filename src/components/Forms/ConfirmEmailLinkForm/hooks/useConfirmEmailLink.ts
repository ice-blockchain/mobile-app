// SPDX-License-Identifier: ice License 1.0

import {AuthStackParamList} from '@navigation/Auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AccountActions} from '@store/modules/Account/actions';
import {failedReasonSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {temporaryEmailSelector} from '@store/modules/Validation/selectors';
import {showError} from '@utils/errors';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useConfirmEmailLink = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const email = useSelector(temporaryEmailSelector, () => true);

  const validateError = useSelector(
    failedReasonSelector.bind(null, AccountActions.MODIFY_EMAIL_WITH_LINK),
  );

  const goBack = () => {
    dispatch(AccountActions.MODIFY_EMAIL_WITH_LINK.RESET.create());
  };

  useEffect(() => {
    if (validateError) {
      showError(validateError);
    }
  }, [validateError, navigation]);

  useEffect(
    () => () => {
      dispatch(AccountActions.MODIFY_EMAIL_WITH_LINK.RESET.create());
    },
    [dispatch],
  );

  return {
    email,
    goBack,
  };
};
