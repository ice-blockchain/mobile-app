// SPDX-License-Identifier: ice License 1.0

import {ContactAvatar} from '@components/ContactAvatar';
import {Touchable} from '@components/Touchable';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {Contact} from 'react-native-contacts';
import Animated, {AnimatedStyleProp} from 'react-native-reanimated';
import {rem} from 'rn-units';

const AnimatedTouchable = Animated.createAnimatedComponent(Touchable);

type Props = {
  onPress: () => void;
  contacts: Contact;
  containerStyle?: AnimatedStyleProp<ViewStyle>;
};

const SIZE = rem(30);

export const ContactsAvatarButton = ({
  onPress,
  contacts,
  containerStyle,
}: Props) => {
  return (
    <AnimatedTouchable
      style={[styles.lettersAvatar, containerStyle]}
      onPress={onPress}
      hitSlop={MIDDLE_BUTTON_HIT_SLOP}>
      <ContactAvatar
        sideSize={SIZE}
        borderRadius={rem(10)}
        textStyle={styles.avatarText}
        contact={contacts}
      />
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  lettersAvatar: {
    width: SIZE,
    height: SIZE,
    bottom: -rem(3),
    right: -rem(3),
    position: 'absolute',
  },
  avatarText: {
    ...font(13, 18, 'regular'),
  },
});
