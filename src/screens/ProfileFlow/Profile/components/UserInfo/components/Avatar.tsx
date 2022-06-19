// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {PenIcon} from '@svg/PenIcon';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {rem} from 'rn-units';

const AVATAR_SIZE = rem(112);
const PEN_SIZE = rem(26);

type Props = {
  uri: string;
  showPen: boolean;
  onPenPress?: () => void;
};

export const Avatar = ({uri, showPen, onPenPress}: Props) => {
  return (
    <View>
      <View style={styles.avatarWrapper}>
        <Image source={{uri}} style={styles.image} />
      </View>
      {showPen && (
        <TouchableOpacity style={styles.button} onPress={onPenPress}>
          <View style={styles.penWrapper}>
            <PenIcon width={rem(14)} height={rem(14)} style={styles.pen} />
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
    borderRadius: rem(34),
    overflow: 'hidden',
  },
  image: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
  button: {
    position: 'absolute',
    bottom: -10,
    right: -10,
  },
  penWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: PEN_SIZE,
    height: PEN_SIZE,
    borderRadius: PEN_SIZE / 2,
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  pen: {
    marginBottom: 1,
    marginLeft: 1,
  },
});
