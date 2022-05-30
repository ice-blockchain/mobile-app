// SPDX-License-Identifier: BUSL-1.1

import {AppleSvg} from '@svg/AppleIcon';
import {FacebookIconSvg} from '@svg/FacebookIcon';
import {GoogleIconSvg} from '@svg/GoogleIcon';
import {TwitterIconSvg} from '@svg/TwitterIcon';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {isIOS, rem} from 'rn-units';

export enum ESocialType {
  apple,
  google,
  facebook,
  twitter,
}

interface SocialSignInProps {
  onPress: (type: ESocialType) => void;
}

export const SocialSignIn = ({onPress}: SocialSignInProps) => {
  const iconPress = (type: ESocialType) => () => onPress(type);
  return (
    <View style={styles.container}>
      {isIOS ? (
        <TouchableOpacity
          style={styles.button}
          onPress={iconPress(ESocialType.apple)}>
          <AppleSvg />
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        style={styles.button}
        onPress={iconPress(ESocialType.google)}>
        <GoogleIconSvg />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={iconPress(ESocialType.facebook)}>
        <FacebookIconSvg />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={iconPress(ESocialType.twitter)}>
        <TwitterIconSvg />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rem(4),
  },
  button: {
    padding: rem(9),
  },
});
