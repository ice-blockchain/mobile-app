// SPDX-License-Identifier: ice License 1.0

import {Country} from '@constants/countries';
import {AccountActions} from '@store/modules/Account/actions';
import {
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {smsSentTimestampSelector} from '@store/modules/Validation/selectors';
import {e164PhoneNumber} from '@utils/phoneNumber';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

type Props = {
  initialPhoneNumber?: string | null;
  selectedCountry?: Country | null;
};

export const useModifyPhoneNumber = ({
  initialPhoneNumber,
  selectedCountry,
}: Props) => {
  const dispatch = useDispatch();
  const [phoneNumberBody, setPhoneNumberBody] = useState(
    initialPhoneNumber ?? '',
  );
  const fullPhoneRef = useRef('');

  const modifyPhoneFailedReason = useSelector(
    failedReasonSelector.bind(null, AccountActions.VERIFY_PHONE_NUMBER),
  );

  const isModifyPhoneLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.VERIFY_PHONE_NUMBER),
  );

  const smsSentTimestamp = useSelector(smsSentTimestampSelector);

  const modifyPhoneNumber = () => {
    const formattedNumber = e164PhoneNumber(
      fullPhoneRef.current ||
        `${selectedCountry?.iddCode ?? ''}${initialPhoneNumber ?? ''}`,
    );
    if (formattedNumber) {
      dispatch(AccountActions.VERIFY_PHONE_NUMBER.RESET.create());
      dispatch(
        AccountActions.VERIFY_PHONE_NUMBER.START.create(formattedNumber),
      );
    }
  };

  const onChangePhone = (phoneBody: string, iddCode: string) => {
    resetError();
    setPhoneNumberBody(phoneBody);
    fullPhoneRef.current = `${iddCode}${phoneBody}`;
  };

  const resetError = () => {
    if (modifyPhoneFailedReason) {
      dispatch(AccountActions.VERIFY_PHONE_NUMBER.RESET.create());
    }
  };

  // clean up on component unmount
  useEffect(
    () => () => {
      dispatch(AccountActions.UPDATE_ACCOUNT.RESET.create());
    },
    [dispatch],
  );

  return {
    phoneNumberBody,
    onChangePhone,
    modifyPhoneNumber,
    isModifyPhoneLoading,
    modifyPhoneFailedReason,
    smsSentTimestamp,
  };
};
