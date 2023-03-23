// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {SocialType} from '@screens/InviteFlow/InviteShare/components/ShareButton/types';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {Social} from 'react-native-share';
import {rem, screenWidth} from 'rn-units';

const BUTTON_LEFT_OFFSET = 32;
const BUTTON_SIDE_DIMENSION = (screenWidth - BUTTON_LEFT_OFFSET * 5) / 4;

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
    width: BUTTON_SIDE_DIMENSION,
    marginLeft: BUTTON_LEFT_OFFSET,
    marginTop: rem(35),
  },
  icon: {
    width: BUTTON_SIDE_DIMENSION,
    height: BUTTON_SIDE_DIMENSION,
  },
  buttonTitle: {
    marginTop: rem(8),
    alignSelf: 'center',
    ...font(11, null, 'regular', 'secondary'),
  },
});
