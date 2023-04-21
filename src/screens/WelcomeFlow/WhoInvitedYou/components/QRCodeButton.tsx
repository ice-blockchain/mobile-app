// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {WelcomeStackParamList} from '@navigation/Welcome';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {QRCodeIcon} from '@svg/QRCodeIcon';
import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onDetect: (content: string) => void;
};

export const QRCodeButton = ({onDetect}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<WelcomeStackParamList>>();

  return (
    <Touchable
      style={styles.container}
      hitSlop={SMALL_BUTTON_HIT_SLOP}
      onPress={() => navigation.navigate('QRCodeScanner', {onDetect})}>
      <QRCodeIcon color={COLORS.secondary} width={rem(24)} height={rem(24)} />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: rem(10),
  },
});
