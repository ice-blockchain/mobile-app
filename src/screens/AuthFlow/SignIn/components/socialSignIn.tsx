// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import {View, StyleSheet} from 'react-native';

import AppleSvg from '@svg/appleIcon';
import GoogleIconSvg from '@svg/googleIcon';
import FacebookIconSvg from '@svg/facebookIcon';
import TwitterIconSvg from '@svg/twitterIcon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {rem, isIOS} from 'rn-units';

export enum ESocialType {
  apple,
  google,
  facebook,
  twitter,
}

interface SocialSignInProps {
  onPress: (type: ESocialType) => void;
}

const SocialSignIn = ({onPress}: SocialSignInProps) => {
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

export default SocialSignIn;

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
