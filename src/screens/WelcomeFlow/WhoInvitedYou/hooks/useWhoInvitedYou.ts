// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {WelcomeStackParamList} from '@navigation/Welcome';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DEFAULT_DIALOG_NO_BUTTON} from '@screens/Modals/PopUp/components/PopUpButton';
import {AccountActions} from '@store/modules/Account/actions';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {
  failedReasonSelector,
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {t} from '@translations/i18n';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {wait} from 'rn-units';

export const useWhoInvitedYou = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<WelcomeStackParamList>>();
  const user = useSelector(unsafeUserSelector);

  const updateRefByUsernameError = useSelector(
    failedReasonSelector.bind(null, AccountActions.UPDATE_REF_BY_USERNAME),
  );
  const validationError = useSelector(
    failedReasonSelector.bind(null, ValidationActions.REF_USERNAME_VALIDATION),
  );
  const updateError = useSelector(
    failedReasonSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const isReferralUpdated = useSelector(
    isSuccessSelector.bind(null, AccountActions.UPDATE_REF_BY_USERNAME),
  );

  const updateRefByUsernameLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_REF_BY_USERNAME),
  );
  const updateLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const [refUsername, setRefUsername] = useState('');
  const [waitLoading, setWaitLoading] = useState(false);

  const isTypedReferralUpdated = useRef(false);

  const onBack = () => {
    resetError();
    resetStep(user);
  };

  const onChangeRefUsername = (text: string) => {
    setRefUsername(text);
    resetError();
    if (isReferralUpdated) {
      isTypedReferralUpdated.current = false;
      dispatch(AccountActions.UPDATE_REF_BY_USERNAME.RESET.create());
    }
    if (text !== '') {
      dispatch(ValidationActions.REF_USERNAME_VALIDATION.START.create(text));
    }
  };

  const onSubmit = () => {
    Keyboard.dismiss();
    isTypedReferralUpdated.current = false;
    resetError();
    dispatch(AccountActions.UPDATE_REF_BY_USERNAME.START.create(refUsername));
  };

  const onSkip = () => {
    const message =
      t('whoInvitedYou.confirm_text_part1') +
      '\n\n' +
      t('whoInvitedYou.confirm_text_part2');
    navigation.navigate('PopUp', {
      title: `${t('global.attention')}!`,
      message: message,
      buttons: [
        DEFAULT_DIALOG_NO_BUTTON,
        {
          text: t('button.yes_btn'),
          onPress: () => {
            dispatch(AccountActions.UPDATE_ACCOUNT.RESET.create());
            dispatch(ValidationActions.REF_USERNAME_VALIDATION.CLEAR.create());
            finalizeStep(user);
          },
        },
      ],
    });
  };

  const resetError = () => {
    if (validationError) {
      dispatch(ValidationActions.REF_USERNAME_VALIDATION.RESET.create());
    }
    if (updateRefByUsernameError) {
      dispatch(AccountActions.UPDATE_REF_BY_USERNAME.RESET.create());
    }
    if (updateError) {
      dispatch(AccountActions.UPDATE_ACCOUNT.RESET.create());
    }
  };

  const resetStep = (userToUpdate: User) => {
    let finalizedSteps =
      userToUpdate.clientData?.registrationProcessFinalizedSteps ?? [];
    if (finalizedSteps.includes('username')) {
      finalizedSteps = finalizedSteps.filter(step => step !== 'username');
      dispatch(
        AccountActions.UPDATE_ACCOUNT.START.create(
          {
            clientData: {
              registrationProcessFinalizedSteps: [...finalizedSteps],
            },
          },
          function* (freshUser) {
            resetStep(freshUser);
            return {retry: false};
          },
        ),
      );
    }
  };

  const finalizeStep = useCallback(
    (currentUser: User) => {
      const finalizedSteps =
        currentUser.clientData?.registrationProcessFinalizedSteps ?? [];

      if (!finalizedSteps.includes('referral')) {
        const steps = [...finalizedSteps];
        if (!finalizedSteps.includes('referral')) {
          steps.push('referral');
        }
        dispatch(
          AccountActions.UPDATE_ACCOUNT.START.create(
            {
              clientData: {
                ...currentUser.clientData,
                registrationProcessFinalizedSteps: [
                  ...finalizedSteps,
                  'referral',
                ],
              },
            },
            function* (freshUser) {
              finalizeStep(freshUser);
              return {retry: false};
            },
          ),
        );
        dispatch(ValidationActions.REF_USERNAME_VALIDATION.CLEAR.create());
      }
    },
    [dispatch],
  );

  useEffect(() => {
    /**
     * We can't rely only on isReferralUpdated because if user is updated
     * (e.g. on the next step), the code will run
     */
    if (isReferralUpdated && !isTypedReferralUpdated.current) {
      isTypedReferralUpdated.current = true;
      /**
       * Small delay here so User can see the update result
       * (green mark) inside text input, before we go forward
       */
      setWaitLoading(true);
      wait(500).then(() => {
        finalizeStep(user);
        setWaitLoading(false);
      });
    }
  }, [dispatch, finalizeStep, isReferralUpdated, user]);

  return {
    refUsername,
    error: updateError || validationError || updateRefByUsernameError,
    isLoading: updateLoading || updateRefByUsernameLoading || waitLoading,
    isReferralUpdated: isReferralUpdated && isTypedReferralUpdated.current,
    onChangeRefUsername,
    onSubmit,
    onSkip,
    onBack,
  };
};
