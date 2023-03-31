// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {SocialType} from '@screens/InviteFlow/InviteShare/components/ShareButton/types';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {Social} from 'react-native-share';
import {rem} from 'rn-units';

export type SocialShareButtonType = {
  type: SocialType;
  title: string;
  icon: number;
  social?: Social;
};

interface ShareButtonProps {
  button: SocialShareButtonType;
  onPress: (type: SocialType) => void;
}
export const ShareButton = ({button, onPress}: ShareButtonProps) => {
  const handlePress = () => {
    onPress(button.type);
  };

  return (
    <Touchable style={styles.button} onPress={handlePress}>
      <Image style={styles.icon} source={button.icon} />
      <Text style={styles.buttonTitle}>{button.title}</Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rem(35),
  },
  icon: {
    width: rem(56),
    height: rem(56),
  },
  buttonTitle: {
    marginTop: rem(8),
    ...font(11, 18, 'regular', 'secondary'),
  },
});
