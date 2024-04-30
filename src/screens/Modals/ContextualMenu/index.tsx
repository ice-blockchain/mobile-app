// SPDX-License-Identifier: ice License 1.0

import {HomeTabStackParamList, MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Menu} from '@screens/Modals/ContextualMenu/components/Menu';
import React, {memo} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

export const ContextualMenu = memo(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeTabStackParamList>>();
  const {
    params: {coords, buttons, onClose},
  } = useRoute<RouteProp<MainStackParamList, 'ContextualMenu'>>();

  const closeMenu = () => {
    navigation.goBack();
    onClose?.();
  };

  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <View style={styles.container}>
        <Menu buttons={buttons} onPress={closeMenu} coordinates={coords} />
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
