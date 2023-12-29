// SPDX-License-Identifier: ice License 1.0

import {removeScreenByName} from '@navigation/utils';
import {AccountActions} from '@store/modules/Account/actions';
import {
  actionPayloadSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {checkProp} from '@utils/guards';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

export const useGoBackIfAddressSet = ({
  isFormSubmitted,
}: {
  isFormSubmitted: boolean;
}) => {
  const isSuccessUpdate = useSelector(
    isSuccessSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const updatePayload = useSelector(
    actionPayloadSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  useEffect(() => {
    if (
      isFormSubmitted &&
      isSuccessUpdate &&
      checkProp(updatePayload, 'userInfo') &&
      checkProp(updatePayload.userInfo, 'miningBlockchainAccountAddress')
    ) {
      removeScreenByName('BscAddress');
    }
  }, [isFormSubmitted, isSuccessUpdate, updatePayload]);
};
