// SPDX-License-Identifier: ice License 1.0

import {MainNavigationParams} from '@navigation/Main';
import {removeScreenByName} from '@navigation/utils';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

export const useGoBackIfAddressSet = () => {
  const user = useSelector(unsafeUserSelector);
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  useEffect(() => {
    if (user.miningBlockchainAccountAddress) {
      removeScreenByName('EthereumAddress');
    }
  }, [user.miningBlockchainAccountAddress, navigation]);
};
