// SPDX-License-Identifier: BUSL-1.1

import {AppleIconSvg} from '@svg/AppleIcon';
import {DiscordIconSvg} from '@svg/DiscordIcon';
import {FacebookIconSvg} from '@svg/FacebookIcon';
import {GoogleIconSvg} from '@svg/GoogleIcon';
import {MicrosoftIconSvg} from '@svg/MicrosoftIcon';
import {TwitterIconSvg} from '@svg/TwitterIcon';
import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {isIOS, rem} from 'rn-units';

export enum ESocialType {
  apple,
  google,
  discord,
  facebook,
  microsoft,
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
          <AppleIconSvg />
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        style={styles.button}
        onPress={iconPress(ESocialType.google)}>
        <GoogleIconSvg />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={iconPress(ESocialType.discord)}>
        <DiscordIconSvg />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={iconPress(ESocialType.facebook)}>
        <FacebookIconSvg />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={iconPress(ESocialType.microsoft)}>
        <MicrosoftIconSvg />
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
    marginTop: rem(10),
  },
  button: {
    padding: rem(9),
  },
});
