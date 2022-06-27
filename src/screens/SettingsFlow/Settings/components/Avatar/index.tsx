// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {PenIcon} from '@svg/PenIcon';
import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {rem} from 'rn-units';

const AVATAR_SIZE = rem(86);
const PEN_SIZE = rem(22);

type Props = {
  uri: string;
  showPen: boolean;
  onPenPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const Avatar = ({uri, style, showPen, onPenPress}: Props) => {
  return (
    <View style={style}>
      <View style={styles.avatarWrapper}>
        <Image source={{uri}} style={styles.image} />
      </View>
      {showPen && (
        <TouchableOpacity style={styles.button} onPress={onPenPress}>
          <View style={styles.penWrapper}>
            <PenIcon width={rem(10)} height={rem(10)} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarWrapper: {
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: rem(25),
    overflow: 'hidden',
  },
  image: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
  button: {
    position: 'absolute',
    bottom: -rem(10),
    right: -rem(10),
  },
  penWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: PEN_SIZE,
    height: PEN_SIZE,
    borderRadius: PEN_SIZE / 2,
    backgroundColor: COLORS.darkBlue,
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
});
