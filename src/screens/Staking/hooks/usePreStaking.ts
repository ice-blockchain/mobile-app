// SPDX-License-Identifier: ice License 1.0

import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {preStakingSummarySelector} from '@store/modules/Tokenomics/selectors';
import {
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const usePreStaking = () => {
  const dispatch = useDispatch();
  const initialized = useRef(false);
  const preStakingSummary = useSelector(preStakingSummarySelector, () => true);
  const isPreStakingSuccess = useSelector(
    isSuccessSelector.bind(null, TokenomicsActions.START_OR_UPDATE_PRE_STAKING),
  );

  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  const preStakingLoading = useSelector(
    isLoadingSelector.bind(null, TokenomicsActions.START_OR_UPDATE_PRE_STAKING),
  );

  useEffect(() => {
    if (initialized.current) {
      if (isPreStakingSuccess) {
        navigation.goBack();
      }
    } else {
      initialized.current = true;
    }
  }, [isPreStakingSuccess, navigation]);

  const confirmPreStaking = (params: {years: number; allocation: number}) => {
    dispatch(
      TokenomicsActions.START_OR_UPDATE_PRE_STAKING.START.create(params),
    );
  };

  return {
    preStakingSummary,
    preStakingLoading,
    confirmPreStaking,
  };
};
