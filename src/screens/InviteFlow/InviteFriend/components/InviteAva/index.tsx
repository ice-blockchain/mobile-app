// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {HEADER_HEIGHT} from '@navigation/components/Header';
import {INVITE_CARD_TOP_OFFSET} from '@screens/InviteFlow/InviteFriend';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {rem} from 'rn-units';

//TODO: replace with profile url
const tempAva = require('../../assets/images/eth.png');
const AVA_SIDE_DIMENSION = rem(132);
const AVA_CONTAINER_SIDE_DIMENSION = rem(138);

interface InviteAvaProps {
  profileUrl: string;
}
export const InviteAva = ({}: InviteAvaProps) => {
  const {top: topInset} = useSafeAreaInsets();
  const topOffset = {
    top:
      HEADER_HEIGHT +
      topInset +
      INVITE_CARD_TOP_OFFSET -
      AVA_CONTAINER_SIDE_DIMENSION / 2,
  };
  return (
    <View style={[styles.container, topOffset]}>
      <Image source={tempAva} style={styles.avaImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: AVA_CONTAINER_SIDE_DIMENSION,
    height: AVA_CONTAINER_SIDE_DIMENSION,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 15,
    shadowColor: 'rgba(45, 98, 217, 0.2)',
    borderRadius: AVA_CONTAINER_SIDE_DIMENSION / 3,
  },
  avaImage: {
    width: AVA_SIDE_DIMENSION,
    height: AVA_SIDE_DIMENSION,
    borderRadius: AVA_SIDE_DIMENSION / 3,
    marginTop: (AVA_CONTAINER_SIDE_DIMENSION - AVA_SIDE_DIMENSION) / 2,
    marginLeft: (AVA_CONTAINER_SIDE_DIMENSION - AVA_SIDE_DIMENSION) / 2,
  },
});

export default InviteAva;
