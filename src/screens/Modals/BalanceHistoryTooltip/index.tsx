// SPDX-License-Identifier: ice License 1.0

import {commonStyles} from '@constants/styles';
import {HomeTabStackParamList, MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Tooltip} from '@screens/Modals/BalanceHistoryTooltip/components/Tooltip';
import React, {memo} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';

export const BalanceHistoryTooltip = memo(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeTabStackParamList>>();
  const {
    params: {coords},
  } = useRoute<RouteProp<MainStackParamList, 'BalanceHistoryTooltip'>>();

  const closeMenu = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <View style={commonStyles.flexOne}>
        <Tooltip coordinates={coords} />
      </View>
    </TouchableWithoutFeedback>
  );
});
